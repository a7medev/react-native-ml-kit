import { NativeModules } from 'react-native';

const LINKING_ERROR =
  `The package '@react-native-ml-kit/face-detection' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const FaceDetection = NativeModules.FaceDetection
  ? NativeModules.FaceDetection
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default {
  detect: (imageURL, options = {}) => FaceDetection.detect(imageURL, options),
};
