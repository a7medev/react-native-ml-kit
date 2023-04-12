import { NativeModules } from 'react-native';

const LINKING_ERROR =
  `The package '@react-native-ml-kit/text-recognition' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

export const TextRecognitionScript = Object.freeze({
  LATIN: 'Latin',
  CHINESE: 'Chinese',
  DEVANAGARI: 'Devanagari',
  JAPANESE: 'Japanese',
  KOREAN: 'Korean',
});

const TextRecognition = NativeModules.TextRecognition
  ? NativeModules.TextRecognition
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default TextRecognition;
