package com.rnmlkit.textrecognition;

import android.graphics.Point;
import android.graphics.Rect;
import android.net.Uri;
import android.graphics.BitmapFactory;
import android.graphics.Bitmap;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

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
import com.google.mlkit.vision.text.TextRecognizerOptionsInterface;
import com.google.mlkit.vision.text.chinese.ChineseTextRecognizerOptions;
import com.google.mlkit.vision.text.devanagari.DevanagariTextRecognizerOptions;
import com.google.mlkit.vision.text.japanese.JapaneseTextRecognizerOptions;
import com.google.mlkit.vision.text.korean.KoreanTextRecognizerOptions;
import com.google.mlkit.vision.text.latin.TextRecognizerOptions;

import java.io.IOException;
import java.net.URL;

public class TextRecognitionModule extends ReactContextBaseJavaModule {

    public TextRecognitionModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "TextRecognition";
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

    private ReadableMap rectToMap(Rect rect) {
        WritableMap map = Arguments.createMap();
        map.putInt("width", rect.width());
        map.putInt("height", rect.height());
        map.putInt("top", rect.top);
        map.putInt("left", rect.left);
        return map;
    }

    private ReadableArray cornerPointsToMap(Point[] points) {
        WritableArray array = Arguments.createArray();
        for (Point point : points) {
            WritableMap map = Arguments.createMap();
            map.putInt("x", point.x);
            map.putInt("y", point.y);
            array.pushMap(map);
        }
        return array;
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
		if (line.getCornerPoints() != null) {
			map.putArray("cornerPoints", cornerPointsToMap(line.getCornerPoints()));
		}
        map.putArray("recognizedLanguages", langToMap(line.getRecognizedLanguage()));

        WritableArray elements = Arguments.createArray();
        for (Text.Element element : line.getElements()) {
            WritableMap el = Arguments.createMap();
            el.putString("text", element.getText());
            if (element.getBoundingBox() != null) {
                el.putMap("frame", rectToMap(element.getBoundingBox()));
            }
            if (element.getCornerPoints() != null) {
            	el.putArray("cornerPoints", cornerPointsToMap(element.getCornerPoints()));
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
        if (block.getCornerPoints() != null) {
			map.putArray("cornerPoints", cornerPointsToMap(block.getCornerPoints()));
		}

        WritableArray lines = Arguments.createArray();
        for (Text.Line line : block.getLines()) {
            lines.pushMap(lineToMap(line));
        }
        map.putArray("lines", lines);

        map.putArray("recognizedLanguages", langToMap(block.getRecognizedLanguage()));
        return map;
    }

    @NonNull
    TextRecognizerOptionsInterface getScriptTextRecognizerOptions(@Nullable String script) {
        if (script == null) {
            return TextRecognizerOptions.DEFAULT_OPTIONS;
        }

        switch (script) {
            case "Chinese":
                return new ChineseTextRecognizerOptions.Builder().build();
            case "Devanagari":
                return new DevanagariTextRecognizerOptions.Builder().build();
            case "Japanese":
                return new JapaneseTextRecognizerOptions.Builder().build();
            case "Korean":
                return new KoreanTextRecognizerOptions.Builder().build();
            default:
                return TextRecognizerOptions.DEFAULT_OPTIONS;
        }
    }

    @ReactMethod
    public void recognize(String url, String script, final Promise promise) {
        InputImage image;
        try {
            image = getInputImage(this.getReactApplicationContext(), url);
            TextRecognizerOptionsInterface options = getScriptTextRecognizerOptions(script);
            TextRecognizer recognizer = TextRecognition.getClient(options);
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
