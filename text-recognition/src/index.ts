// index.ts
// Point d'entrée JavaScript/TypeScript de la librairie.
//
// Stratégie de rétrocompatibilité JS :
//
//   Nouvelle archi (TurboModule disponible) :
//     → global.__turboModuleProxy existe
//     → TurboModuleRegistry.strictGet() charge le module via JSI directement
//
//   Ancienne archi (Bridge) :
//     → global.__turboModuleProxy est undefined
//     → On passe par NativeModules (le bon vieux pont JSON)
//     → L'API exposée est identique : les utilisateurs ne voient aucune différence
//
// Le type TextRecognitionResult est réexporté pour les utilisateurs TypeScript.

import { NativeModules, Platform } from 'react-native';
import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

// ─── Types publics ────────────────────────────────────────────────────────────

export type CornerPoint = { x: number; y: number };

export type Frame = {
  width: number;
  height: number;
  top: number;
  left: number;
};

export type RecognizedLanguage = { languageCode: string };

export type TextElement = {
  text: string;
  frame: Frame | null;
  cornerPoints: CornerPoint[] | null;
};

export type TextLine = {
  text: string;
  frame: Frame | null;
  cornerPoints: CornerPoint[] | null;
  recognizedLanguages: RecognizedLanguage[];
  confidenceScore: number;
  rotationDegree: number;
  elements: TextElement[];
};

export type TextBlock = {
  text: string;
  frame: Frame | null;
  cornerPoints: CornerPoint[] | null;
  recognizedLanguages: RecognizedLanguage[];
  lines: TextLine[];
};

export type TextRecognitionResult = {
  text: string;
  blocks: TextBlock[];
};

export type Script =
  | 'Latin'
  | 'Chinese'
  | 'Devanagari'
  | 'Japanese'
  | 'Korean';

// ─── Contrat du module natif ──────────────────────────────────────────────────

interface Spec extends TurboModule {
  recognize(url: string, script: string): Promise<TextRecognitionResult>;
}

// ─── Résolution de l'implémentation selon l'architecture active ───────────────
//
// global.__turboModuleProxy est injecté par le runtime React Native
// UNIQUEMENT si la New Architecture est activée.
// C'est le mécanisme officiel recommandé dans la doc React Native.

const MODULE_NAME = 'TextRecognition';

function getNativeModule(): Spec {
  // @ts-ignore — __turboModuleProxy n'est pas dans les types officiels
  if (global.__turboModuleProxy != null) {
    // New Architecture : appel JSI direct, sans sérialisation JSON
    return TurboModuleRegistry.getEnforcing<Spec>(MODULE_NAME);
  } else {
    // Ancienne archi : passage par le Bridge (NativeModules)
    const legacy = NativeModules[MODULE_NAME];
    if (!legacy) {
      throw new Error(
        `[RNMLKitTextRecognition] Le module natif "${MODULE_NAME}" est introuvable. ` +
        `Vérifiez que le pod est bien installé (iOS) ou que le package est lié (Android).`
      );
    }
    return legacy as Spec;
  }
}

const NativeTextRecognition = getNativeModule();

// ─── API publique ─────────────────────────────────────────────────────────────
// Une seule fonction exposée — identique quelle que soit l'archi en dessous.

export async function recognize(
  imageUrl: string,
  script: Script = 'Latin'
): Promise<TextRecognitionResult> {
  return NativeTextRecognition.recognize(imageUrl, script);
}

export default { recognize };
