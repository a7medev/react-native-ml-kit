// ObjectDetectionModule.java

package com.rnmlkit.objectdetection;

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
    public void label(final ReadableMap optionsMap, final Promise promise) {

        promise.resolve(null);
    }
}
