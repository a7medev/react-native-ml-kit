// TextRecognitionPackage.java
// Adapté pour la New Architecture React Native (TurboModules / JSI)
//
// Changements par rapport à l'ancienne architecture :
//   AVANT : implements ReactPackage  →  createNativeModules()
//   APRÈS : extends TurboReactPackage  →  getModule() + getReactModuleInfoProvider()
//
// TurboReactPackage permet à React Native de n'instancier le module
// que si le JS le demande (lazy loading), ce qui est impossible avec
// l'ancienne ReactPackage.

package com.rnmlkit.textrecognition;

import androidx.annotation.Nullable;

import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;

import java.util.HashMap;
import java.util.Map;

public class TextRecognitionPackage extends TurboReactPackage {

    // ─── Instanciation à la demande ───────────────────────────────────────────
    // Appelé par React Native uniquement quand le JS importe le module.
    // Remplace la liste statique de createNativeModules().
    @Override
    @Nullable
    public NativeModule getModule(String name, ReactApplicationContext reactContext) {
        if (TextRecognitionModule.NAME.equals(name)) {
            return new TextRecognitionModule(reactContext);
        }
        return null;
    }

    // ─── Déclaration des modules (métadonnées pour le registre TurboModule) ───
    // React Native lit ces infos au démarrage pour savoir quels modules
    // sont disponibles, sans les instancier.
    @Override
    public ReactModuleInfoProvider getReactModuleInfoProvider() {
        return () -> {
            Map<String, ReactModuleInfo> map = new HashMap<>();
            map.put(
                TextRecognitionModule.NAME,
                new ReactModuleInfo(
                    TextRecognitionModule.NAME,   // name
                    TextRecognitionModule.class.getName(), // className
                    false,  // canOverrideExistingModule
                    false,  // needsEagerInit
                    true,   // hasConstants
                    false,  // isCxxModule (false : on reste en Java, pas en C++ pur)
                    true    // isTurboModule ← active JSI pour ce module
                )
            );
            return map;
        };
    }
}
