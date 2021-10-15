export interface Label {
  text: string;
  confidence: number;
  index: number;
}

interface IImageLabeling {
  label: (imageURL: string) => Promise<Label[]>;
}

declare const ImageLabeling: IImageLabeling;

export default ImageLabeling;
