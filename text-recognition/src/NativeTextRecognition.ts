// NativeTextRecognition.ts
// Codegen spec — React Native New Architecture (JSI / TurboModules)
//
// Ce fichier est le contrat entre JavaScript et le module natif.
// Le Codegen de React Native lit ce fichier à la compilation et génère
// automatiquement la couche C++ (le "pont JSI") ainsi que le fichier
// Java NativeTextRecognitionSpec.java.
//
// Pour l'activer, référencer ce fichier dans package.json :
//   "codegenConfig": {
//     "name": "TextRecognitionSpec",
//     "type": "modules",
//     "jsSrcsDir": "./src"
//   }

import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

// --- Types de retour ---

export type CornerPoint = {
  x: number;
  y: number;
};

export type Frame = {
  width: number;
  height: number;
  top: number;
  left: number;
};

export type RecognizedLanguage = {
  languageCode: string;
};

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

// --- Contrat du module ---

export interface Spec extends TurboModule {
  /**
   * Reconnaît le texte dans une image.
   * @param url  URL distante (http/https) ou chemin fichier local (file://)
   * @param script  Script de reconnaissance : 'Latin' | 'Chinese' | 'Devanagari' | 'Japanese' | 'Korean'
   */
  recognize(url: string, script: string): Promise<TextRecognitionResult>;
}

export default TurboModuleRegistry.strictGet<Spec>('TextRecognition');
