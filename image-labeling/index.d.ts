export interface Label {
  text: string;
  confidence: number;
  index: number;
}

interface IImageLabeling {
  /**
   * Label an image
   *
   * @param imageURL The URL/Path of the image to label
   * @returns Array of expected labels for the image
   */
  label: (imageURL: string) => Promise<Label[]>;
}

declare const ImageLabeling: IImageLabeling;

export default ImageLabeling;
