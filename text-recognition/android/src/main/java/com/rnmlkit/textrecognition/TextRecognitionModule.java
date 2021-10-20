package com.rnmlkit.textrecognition;

import android.graphics.Rect;
import android.net.Uri;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.text.Text;
import com.google.mlkit.vision.text.TextRecognition;
import com.google.mlkit.vision.text.TextRecognizer;
import com.google.mlkit.vision.text.latin.TextRecognizerOptions;

import java.io.IOException;

public class TextRecognitionModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public TextRecognitionModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "TextRecognition";
    }

    private ReadableMap rectToMap(Rect rect) {
        WritableMap map = Arguments.createMap();
        map.putInt("width", rect.width());
        map.putInt("height", rect.height());
        map.putInt("top", rect.top);
        map.putInt("left", rect.left);
        return map;
    }

    private ReadableArray langToMap(String lang) {
        WritableArray array = Arguments.createArray();
        WritableMap map = Arguments.createMap();
        map.putString("languageCode", lang);
        array.pushMap(map);
        return array;
    }

    private ReadableMap lineToMap(Text.Line line) {
        WritableMap map = Arguments.createMap();

        map.putString("text", line.getText());
        if (line.getBoundingBox() != null) {
            map.putMap("frame", rectToMap(line.getBoundingBox()));
        }
        map.putArray("recognizedLanguages", langToMap(line.getRecognizedLanguage()));

        WritableArray elements = Arguments.createArray();
        for (Text.Element element : line.getElements()) {
            WritableMap el = Arguments.createMap();
            el.putString("text", element.getText());
            if (element.getBoundingBox() != null) {
                el.putMap("frame", rectToMap(element.getBoundingBox()));
            }
            elements.pushMap(el);
        }
        map.putArray("elements", elements);

        return map;
    }

    private ReadableMap blockToMap(Text.TextBlock block) {
        WritableMap map = Arguments.createMap();
        map.putString("text", block.getText());
        if (block.getBoundingBox() != null) {
            map.putMap("frame", rectToMap(block.getBoundingBox()));
        }

        WritableArray lines = Arguments.createArray();
        for (Text.Line line : block.getLines()) {
            lines.pushMap(lineToMap(line));
        }
        map.putArray("lines", lines);

        map.putArray("recognizedLanguages", langToMap(block.getRecognizedLanguage()));
        return map;
    }

    @ReactMethod
    public void recognize(String url, final Promise promise) {
        Uri uri = Uri.parse(url);
        InputImage image;
        try {
            image = InputImage.fromFilePath(reactContext, uri);
            TextRecognizer recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS);
            recognizer.process(image)
                    .addOnSuccessListener(new OnSuccessListener<Text>() {
                        @Override
                        public void onSuccess(Text visionText) {
                            WritableMap result = Arguments.createMap();
                            result.putString("text", visionText.getText());

                            WritableArray blocks = Arguments.createArray();
                            for (Text.TextBlock block : visionText.getTextBlocks()) {
                                blocks.pushMap(blockToMap(block));
                            }
                            result.putArray("blocks", blocks);

                            promise.resolve(result);
                        }
                    })
                    .addOnFailureListener(
                            new OnFailureListener() {
                                @Override
                                public void onFailure(@NonNull Exception e) {
                                    e.printStackTrace();
                                    promise.reject("Text recognition failed", e);
                                }
                            });
        } catch (IOException e) {
            e.printStackTrace();
            promise.reject("Text recognition failed", e);
        }
    }
}
