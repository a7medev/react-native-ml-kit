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

export interface TextElement {
  /** Recognized text of the element (word) */
  text: string;
  /** Bonding box of the element (word) */
  frame?: Frame;
  /** Corner points of the element (word) */
  cornerPoints: Point[];
}

export interface TextLine {
  /** Recognized text in the line */
  text: string;
  /** Line bounding box */
  frame?: Frame;
  /** Line corner points */
  cornerPoints: Point[];
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
  cornerPoints: Point[];
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

interface ITextRecognition {
  /**
   * Recognize text in the image
   *
   * @param imageURL The URL/Path of the image to process
   *
   * @param language @optional The language to use for non-latin
   * text recognition. The default is English. Available languages:
   * - Chinese
   * - Devanagari
   * - Japanese
   * - Korean
   *
   * @returns Text recognition result
   */
  recognize: (imageURL: string, language?: string | null) => Promise<TextRecognitionResult>;
}

declare const TextRecognition: ITextRecognition;

export default TextRecognition;
