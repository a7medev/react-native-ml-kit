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

export type Coutour = Point[];

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
  contours: {
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
  performanceMode?: 'none' | 'all';
  landmarkMode?: 'none' | 'all';
  contourMode?: 'none' | 'all';
  classificationMode?: 'none' | 'all';
  minFaceSize?: number;
  trackingEnabled?: boolean;
}

interface IFaceDetection {
  detect: (imageURL: string, options: FaceDetectionOptions) => Promise<Face[]>;
}

declare const FaceDetection: IFaceDetection;

export default FaceDetection;
