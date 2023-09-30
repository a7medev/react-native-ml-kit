import { NativeModules, Platform } from 'react-native';

export interface Point {
  x: number;
  y: number;
}

export interface Frame {
  width: number;
  height: number;
  top: number;
  left: number;
}

export interface Landmark {
  position: Point;
}

export interface Coutour {
  points: Point[];
}

export type LandmarkType =
  | 'leftEar'
  | 'rightEar'
  | 'leftEye'
  | 'rightEye'
  | 'noseBase'
  | 'leftCheek'
  | 'rightCheek'
  | 'mouthLeft'
  | 'mouthRight'
  | 'mouthBottom';

export type ContourType =
  | 'face'
  | 'leftEye'
  | 'rightEye'
  | 'leftCheek'
  | 'rightCheek'
  | 'noseBottom'
  | 'noseBridge'
  | 'leftEyebrowTop'
  | 'rightEyebrowTop'
  | 'leftEyebrowBottom'
  | 'rightEyebrowBottom'
  | 'upperLipTop'
  | 'lowerLipTop'
  | 'upperLipBottom'
  | 'lowerLipBottom';

export interface Face {
  frame: Frame;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  landmarks?: Record<LandmarkType, Landmark>;
  contours?: Record<ContourType, Coutour>;
  smilingProbability?: number;
  leftEyeOpenProbability?: number;
  rightEyeOpenProbability?: number;
  trackingID?: number;
}

export interface FaceDetectionOptions {
  /**
   * Favor speed or accuracy when detecting faces.
   *
   * @default 'fast'
   */
  performanceMode?: 'fast' | 'accurate';

  /**
   * Whether to attempt to identify facial "landmarks": eyes, ears, nose, cheeks, mouth, and so on.
   *
   * @default 'none'
   */
  landmarkMode?: 'none' | 'all';

  /**
   * Whether to detect the contours of facial features. Contours are detected for only the most prominent face in an image.
   *
   * @default 'none'
   */
  contourMode?: 'none' | 'all';

  /**
   * Whether or not to classify faces into categories such as "smiling", and "eyes open".
   *
   * @default 'none'
   */
  classificationMode?: 'none' | 'all';

  /**
   * Sets the smallest desired face size, expressed as the ratio of the width of the head to width of the image.
   *
   * @default 0.1
   */
  minFaceSize?: number;

  /**
   * **(COMING SOON)**
   *
   * Whether or not to assign faces an ID, which can be used to track faces across images.
   *
   * Note that when contour detection is enabled, only one face is detected, so face tracking doesn't produce useful results. For this reason, and to improve detection speed, don't enable both contour detection and face tracking.
   *
   * @default false
   */
  trackingEnabled?: boolean;
}

const LINKING_ERROR =
  `The package '@react-native-ml-kit/face-detection' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const NativeFaceDetection = NativeModules.FaceDetection
  ? NativeModules.FaceDetection
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

const FaceDetection = {
  detect: (
    imageURL: string,
    options: FaceDetectionOptions = {}
  ): Promise<Face[]> => {
    return NativeFaceDetection.detect(imageURL, options);
  },
};

export default FaceDetection;
