export interface Point {
  x: number;
  y: number;
}

export interface Frame {
  width: number;
  height: number;
  origin: Point;
}

export interface Landmark {
  position: Point;
}

export interface Coutour {
  points: Point[];
}

export interface Face {
  frame: Frame;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  landmarks?: {
    leftEar?: Landmark;
    rightEar?: Landmark;
    leftEye?: Landmark;
    rightEye?: Landmark;
    noseBase?: Landmark;
    leftCheek?: Landmark;
    rightCheek?: Landmark;
    mouthLeft?: Landmark;
    mouthRight?: Landmark;
    mouthBottom?: Landmark;
  };
  contours?: {
    face?: Coutour;
    leftEye?: Coutour;
    rightEye?: Coutour;
    leftCheek?: Coutour;
    rightCheek?: Coutour;
    noseBottom?: Coutour;
    noseBridge?: Coutour;
    leftEyebrowTop?: Coutour;
    rightEyebrowTop?: Coutour;
    leftEyebrowBottom?: Coutour;
    rightEyebrowBottom?: Coutour;
    upperLipTop?: Coutour;
    lowerLipTop?: Coutour;
    upperLipBottom?: Coutour;
    lowerLipBottom?: Coutour;
  };
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

interface IFaceDetection {
  detect: (imageURL: string, options?: FaceDetectionOptions) => Promise<Face[]>;
}

declare const FaceDetection: IFaceDetection;

export default FaceDetection;
