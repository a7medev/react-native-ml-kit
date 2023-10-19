import { NativeModules, Platform } from 'react-native';

export interface Frame {
  width: number;
  height: number;
  top: number;
  left: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface Language {
  /** Language code of the language */
  languageCode: string;
}

export type CornerPoints = readonly [Point, Point, Point, Point];

export interface TextElement {
  /** Recognized text of the element (word) */
  text: string;
  /** Bonding box of the element (word) */
  frame?: Frame;
  /** Corner points of the element (word) */
  cornerPoints?: CornerPoints;
}

export interface TextLine {
  /** Recognized text in the line */
  text: string;
  /** Line bounding box */
  frame?: Frame;
  /** Line corner points */
  cornerPoints?: CornerPoints;
  /** Elements (words) in the line */
  elements: TextElement[];
  /** Languages recognized in the line */
  recognizedLanguages: Language[];
}

export interface TextBlock {
  /** Recognized text in the block */
  text: string;
  /** Block bounding box */
  frame?: Frame;
  /** Block corner points */
  cornerPoints?: CornerPoints;
  /** Lines of text in the block */
  lines: TextLine[];
  /** Languages recognized in the block */
  recognizedLanguages: Language[];
}

export interface TextRecognitionResult {
  /** Recognized text in the image */
  text: string;
  /** Block of text recognized in the image */
  blocks: TextBlock[];
}

export enum TextRecognitionScript {
  LATIN = 'Latin',
  CHINESE = 'Chinese',
  DEVANAGARI = 'Devanagari',
  JAPANESE = 'Japanese',
  KOREAN = 'Korean',
}

const LINKING_ERROR =
  `The package '@react-native-ml-kit/text-recognition' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const NativeTextRecognition = NativeModules.TextRecognition
  ? NativeModules.TextRecognition
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const TextRecognition = {
  /**
   * Recognize text in the image.
   *
   * @param imageURL The URL/path of the image to process.
   *
   * @param [script=TextRecognitionScript.LATIN] The language script to recognize.
   * Supported languages are Latin, Chinese, Devanagari, Japanese, and Korean.
   *
   * @returns Text recognition result
   */
  recognize: (
    imageURL: string,
    script = TextRecognitionScript.LATIN
  ): Promise<TextRecognitionResult> => {
    return NativeTextRecognition.recognize(imageURL, script);
  },
};

export default TextRecognition;
