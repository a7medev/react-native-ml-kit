// CustomImageLabelingModule.java

package com.rnmlkit.customimagelabeling;

import android.net.Uri;
import android.content.res.AssetManager;
import android.graphics.BitmapFactory;
import android.graphics.Bitmap;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReadableMap;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.common.model.LocalModel;
import com.google.mlkit.vision.label.custom.CustomImageLabelerOptions;
import com.google.mlkit.vision.label.ImageLabel;
import com.google.mlkit.vision.label.ImageLabeler;
import com.google.mlkit.vision.label.ImageLabeling;
import com.google.mlkit.vision.label.defaults.ImageLabelerOptions;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.net.URL;

public class CustomImageLabelingModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public CustomImageLabelingModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "CustomImageLabeling";
    }

    public static List<String> loadLabelsFromAsset(ReactApplicationContext context, String fileName)
            throws IOException {

        AssetManager manager = context.getAssets();
        InputStream is = manager.open(fileName);

        List<String> localLabels = new ArrayList<String>();

        BufferedReader bf = new BufferedReader(new InputStreamReader(is, "UTF-8"));

        String line = bf.readLine();

        while (line != null) {
            localLabels.add(line);
            line = bf.readLine();
        }

        is.close();
        bf.close();

        return localLabels;
    }

    public static InputImage getInputImage(ReactApplicationContext reactContext, String url)
            throws IOException {

        if (url.contains("http://") || url.contains("https://")) {
            URL urlInput = new URL(url);
            Bitmap image = BitmapFactory.decodeStream(urlInput.openConnection().getInputStream());
            InputImage inputImage = InputImage.fromBitmap(image, 0);
            return inputImage;
        }
        else {
            Uri uri = Uri.parse(url);
            InputImage inputImage = InputImage.fromFilePath(reactContext, uri);
            return inputImage;
        }
    }

    @ReactMethod
    public void label(final ReadableMap optionsMap, final Promise promise) {

        String url = optionsMap.getString("url");
        Float confidence = (float)(optionsMap.getDouble("confidence"));

        try {
            InputImage image = getInputImage(this.reactContext, url);

            String localModelFilename = optionsMap.getString("localModelFilename");
            String localLabelsFilename = optionsMap.getString("localLabelsFilename");

            List<String> localLabels
                    = loadLabelsFromAsset(this.reactContext, localLabelsFilename);

            LocalModel localModel = new LocalModel.Builder()
                            .setAssetFilePath(localModelFilename)
                            .build();

            CustomImageLabelerOptions options =
                    new CustomImageLabelerOptions.Builder(localModel)
                            .setConfidenceThreshold(confidence)
                            .build();

            ImageLabeler labeler = ImageLabeling.getClient(options);

            labeler.process(image)
                    .addOnSuccessListener(new OnSuccessListener<List<ImageLabel>>() {
                        @Override
                        public void onSuccess(List<ImageLabel> labels) {
                            WritableArray result = Arguments.createArray();
                            for (ImageLabel label : labels) {
                                WritableMap map = Arguments.createMap();
                                map.putString("text", localLabels.get(label.getIndex()));
                                map.putDouble("confidence", label.getConfidence());
                                map.putInt("index", label.getIndex());
                                result.pushMap(map);
                            }
                            promise.resolve(result);
                        }
                    })
                    .addOnFailureListener(new OnFailureListener() {
                        @Override
                        public void onFailure(@NonNull Exception e) {
                            e.printStackTrace();
                            promise.reject("Custom Image labeling failed", e);
                        }
                    });
        } catch (IOException e) {
            e.printStackTrace();
            promise.reject("Custom Image labeling failed", e);
        }
    }
}
