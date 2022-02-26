export interface Frame {
  width: number;
  height: number;
  top: number;
  left: number;
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
}

export interface TextLine {
  /** Recognized text in the line */
  text: string;
  /** Line bounding box */
  frame?: Frame;
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
   * @returns Text recognition result
   */
  recognize: (imageURL: string) => Promise<TextRecognitionResult>;
}

declare const TextRecognition: ITextRecognition;

export default TextRecognition;
