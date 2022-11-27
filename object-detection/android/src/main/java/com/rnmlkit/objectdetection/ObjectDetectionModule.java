// ObjectDetectionModule.java

package com.rnmlkit.objectdetection;

import android.net.Uri;
import android.content.res.AssetManager;
import android.graphics.BitmapFactory;
import android.graphics.Bitmap;
import android.graphics.Rect;

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
import com.google.mlkit.common.model.LocalModel;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.objects.defaults.ObjectDetectorOptions;
import com.google.mlkit.vision.objects.ObjectDetector;
import com.google.mlkit.vision.objects.ObjectDetection;
import com.google.mlkit.vision.objects.DetectedObject;
import com.google.mlkit.vision.objects.DetectedObject.Label;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.net.URL;

public class ObjectDetectionModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public ObjectDetectionModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "ObjectDetection";
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
    public void detectSingleImage(final ReadableMap optionsMap, final Promise promise) {

        String url = optionsMap.getString("url");

        boolean shouldEnableMultipleObjects = optionsMap.getBoolean("shouldEnableMultipleObjects");
        boolean shouldEnableClassification = optionsMap.getBoolean("shouldEnableClassification");

        ObjectDetectorOptions.Builder options =
            new ObjectDetectorOptions.Builder();

        options.setDetectorMode(ObjectDetectorOptions.SINGLE_IMAGE_MODE);

        if (shouldEnableClassification) {
            options.enableClassification();
        }

        if (shouldEnableMultipleObjects) {
            options.enableMultipleObjects();
        }

        ObjectDetector objectDetector = ObjectDetection.getClient(options.build());

        try {
            InputImage image = getInputImage(this.reactContext, url);

            objectDetector.process(image)
                .addOnSuccessListener(
                    new OnSuccessListener<List<DetectedObject>>() {
                        @Override
                        public void onSuccess(List<DetectedObject> detectedObjects) {

                            WritableArray result = Arguments.createArray();

                            for (DetectedObject detectedObject : detectedObjects) {
                                Rect boundingBox = detectedObject.getBoundingBox();

                                for (Label label : detectedObject.getLabels()) {
                                    WritableMap map = Arguments.createMap();
                                    map.putInt("frameX", boundingBox.left);
                                    map.putInt("frameY", boundingBox.top);
                                    map.putInt("frameWidth", boundingBox.right - boundingBox.left);
                                    map.putInt("frameHeight", boundingBox.bottom - boundingBox.top);
                                    map.putString("text", label.getText());
                                    map.putDouble("confidence", label.getConfidence());
                                    map.putInt("index", label.getIndex());
                                    result.pushMap(map);
                                }
                            }
                            promise.resolve(result);
                        }
                    })
                .addOnFailureListener(
                    new OnFailureListener() {
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
