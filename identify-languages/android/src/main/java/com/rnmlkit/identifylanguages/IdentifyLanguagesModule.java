// IdentifyLanguagesModule.java

package com.rnmlkit.identifylanguages;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.mlkit.nl.languageid.IdentifiedLanguage;
import com.google.mlkit.nl.languageid.LanguageIdentification;
import com.google.mlkit.nl.languageid.LanguageIdentifier;

import java.util.List;

public class IdentifyLanguagesModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public IdentifyLanguagesModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "IdentifyLanguages";
    }

    @ReactMethod
    public void identify(String text, final Promise promise) {
        LanguageIdentifier languageIdentifier =
                LanguageIdentification.getClient();
        languageIdentifier.identifyLanguage(text)
                .addOnSuccessListener(
                        new OnSuccessListener<String>() {
                            @Override
                            public void onSuccess(@Nullable String languageCode) {
                                promise.resolve(languageCode);
                            }
                        })
                .addOnFailureListener(
                        new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception e) {
                                e.printStackTrace();
                                promise.reject("Language identification failed", e);
                            }
                        });
    }

    @ReactMethod
    public void identifyPossible(String text, final Promise promise) {
        LanguageIdentifier languageIdentifier =
                LanguageIdentification.getClient();
        languageIdentifier.identifyPossibleLanguages(text)
                .addOnSuccessListener(
                        new OnSuccessListener<List<IdentifiedLanguage>>() {
                            @Override
                            public void onSuccess(List<IdentifiedLanguage> identifiedLanguages) {
                                WritableArray result = Arguments.createArray();
                                for (IdentifiedLanguage identifiedLanguage : identifiedLanguages) {
                                    WritableMap map = Arguments.createMap();
                                    map.putString("language", identifiedLanguage.getLanguageTag());
                                    map.putDouble("confidence", identifiedLanguage.getConfidence());
                                    result.pushMap(map);
                                }
                                promise.resolve(result);
                            }
                        })
                .addOnFailureListener(
                        new OnFailureListener() {
                            @Override
                            public void onFailure(@NonNull Exception e) {
                                e.printStackTrace();
                                promise.reject("Language identification failed", e);
                            }
                        });
    }
}
