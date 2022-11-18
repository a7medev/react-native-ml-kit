// ImageLabelingModule.java

package com.rnmlkit.imagelabeling;

import android.net.Uri;
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
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.label.ImageLabel;
import com.google.mlkit.vision.label.ImageLabeler;
import com.google.mlkit.vision.label.ImageLabeling;
import com.google.mlkit.vision.label.defaults.ImageLabelerOptions;

import java.io.IOException;
import java.util.List;
import java.net.URL;

public class ImageLabelingModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public ImageLabelingModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "ImageLabeling";
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
    public void label(String url, final Promise promise) {
        InputImage image;
        try {
            image = getInputImage(this.reactContext, url);
            ImageLabelerOptions options =
                    new ImageLabelerOptions.Builder()
                            .setConfidenceThreshold(0.5f)
                            .build();
            ImageLabeler labeler = ImageLabeling.getClient(options);
            labeler.process(image)
                    .addOnSuccessListener(new OnSuccessListener<List<ImageLabel>>() {
                        @Override
                        public void onSuccess(List<ImageLabel> labels) {
                            WritableArray result = Arguments.createArray();
                            for (ImageLabel label : labels) {
                                WritableMap map = Arguments.createMap();
                                map.putString("text", label.getText());
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
                            promise.reject("Image labeling failed", e);
                        }
                    });
        } catch (IOException e) {
            e.printStackTrace();
            promise.reject("Image labeling failed", e);
        }
    }
}
