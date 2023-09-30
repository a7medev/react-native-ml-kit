import { NativeModules, Platform } from 'react-native';

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

const LINKING_ERROR =
  `The package '@react-native-ml-kit/image-labeling' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const ImageLabeling: IImageLabeling = NativeModules.ImageLabeling
  ? NativeModules.ImageLabeling
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default ImageLabeling;
