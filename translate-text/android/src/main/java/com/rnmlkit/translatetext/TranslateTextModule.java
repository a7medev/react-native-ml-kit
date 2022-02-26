package com.rnmlkit.translatetext;

import android.os.Build;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.mlkit.common.model.DownloadConditions;
import com.google.mlkit.nl.translate.TranslateLanguage;
import com.google.mlkit.nl.translate.Translation;
import com.google.mlkit.nl.translate.Translator;
import com.google.mlkit.nl.translate.TranslatorOptions;

public class TranslateTextModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public TranslateTextModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "TranslateText";
    }

    private void startTranslation(final Translator translator, final String text, final Promise promise) {
        translator.translate(text)
                .addOnSuccessListener(
                        new OnSuccessListener<String>() {
                            @Override
                            public void onSuccess(String translatedText) {
                                promise.resolve(translatedText);
                                translator.close();
                            }
                        }
                )
                .addOnFailureListener(
                        new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception e) {
                                e.printStackTrace();
                                translator.close();
                                promise.reject("TEXT_TRANSLATE_FAILED", e);
                            }
                        }
                );
    }

    @ReactMethod
    public void translate(final ReadableMap optionsMap, final Promise promise) {
        String text = optionsMap.getString("text");
        if (text == null) {
            promise.reject("TEXT_TRANSLATE_FAILED", "Text cannot be null");
            return;
        }
        String sourceLanguage = optionsMap.getString("sourceLanguage");
        String targetLanguage = optionsMap.getString("targetLanguage");
        if (sourceLanguage != null) {
            sourceLanguage = TranslateLanguage.fromLanguageTag(sourceLanguage);
        }
        if (targetLanguage != null) {
            targetLanguage = TranslateLanguage.fromLanguageTag(targetLanguage);
        }
        if (sourceLanguage == null) {
            promise.reject("TEXT_TRANSLATE_FAILED", "Source language cannot be null");
            return;
        }
        if (targetLanguage == null) {
            promise.reject("TEXT_TRANSLATE_FAILED", "Target language cannot be null");
            return;
        }
        TranslatorOptions options = new TranslatorOptions.Builder()
                .setSourceLanguage(sourceLanguage)
                .setTargetLanguage(targetLanguage)
                .build();
        Translator translator = Translation.getClient(options);
        if (optionsMap.hasKey("downloadModelIfNeeded") && optionsMap.getBoolean("downloadModelIfNeeded")) {
            DownloadConditions.Builder conditions = new DownloadConditions.Builder();
            if (optionsMap.hasKey("requiresWifi") && optionsMap.getBoolean("requireWifi")) {
                conditions.requireWifi();
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N && optionsMap.hasKey("requireCharging") && optionsMap.getBoolean("requireCharging")) {
                conditions.requireCharging();
            }
            translator.downloadModelIfNeeded(conditions.build())
                    .addOnSuccessListener(
                            new OnSuccessListener() {
                                @Override
                                public void onSuccess(Object o) {
                                    startTranslation(translator, text, promise);
                                }
                            })
                    .addOnFailureListener(
                            new OnFailureListener() {
                                @Override
                                public void onFailure(@NonNull Exception e) {
                                    e.printStackTrace();
                                    promise.reject("TEXT_TRANSLATE_FAILED", e);
                                }
                            });
        } else {
            startTranslation(translator, text, promise);
        }
    }
}
