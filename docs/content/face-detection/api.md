---
sidebar_position: 4
title: API Reference
---



## Configuration Options

Pass these options to the `detect` method to customize face detection.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `performanceMode` | `'fast' \| 'accurate'` | `'fast'` | **fast**: Real-time/video.<br/>**accurate**: Static images/precise landmarks. |
| `landmarkMode` | `'none' \| 'all'` | `'none'` | Detects eyes, ears, nose, mouth. Increases processing time. |
| `contourMode` | `'none' \| 'all'` | `'none'` | Traces facial features. Computationally expensive. |
| `classificationMode` | `'none' \| 'all'` | `'none'` | Classifies smiling and eyes open probabilities. |
| `minFaceSize` | `number` | `0.1` | Minimum face size relative to image width. Increase to speed up detection. |
| `trackingEnabled` | `boolean` | `false` | **(Coming Soon)** Assigns IDs to track faces. Incompatible with *contourMode*. |

## Types

### `Face`

The main object returned for each detected face.

```typescript
interface Face {
  frame: Frame;
  landmarks?: Record<LandmarkType, Landmark>;
  contours?: Record<ContourType, Contour>;
  rotationX: number;  // Head tilt (up/down)
  rotationY: number;  // Head turn (left/right)
  rotationZ: number;  // Head tilt (sideways)
  smilingProbability?: number;
  leftEyeOpenProbability?: number;
  rightEyeOpenProbability?: number;
  trackingID?: number;
}
```

### Supporting Types

```typescript
interface Frame {
  width: number;
  height: number;
  top: number;
  left: number;
}

interface Landmark {
  position: Point;
}

interface Contour {
  points: Point[];
}

interface Point {
  x: number;
  y: number;
}
```

### `LandmarkType`

```typescript
type LandmarkType = 'leftEar' | 'rightEar' | 'leftEye' | 'rightEye' | 'noseBase' | 
                    'leftCheek' | 'rightCheek' | 'mouthLeft' | 'mouthRight' | 'mouthBottom';
```

### `ContourType`

```typescript
type ContourType = 'face' | 'leftEye' | 'rightEye' | 'leftCheek' | 'rightCheek' | 
                   'noseBottom' | 'noseBridge' | 'leftEyebrowTop' | 'rightEyebrowTop' | 
                   'leftEyebrowBottom' | 'rightEyebrowBottom' | 'upperLipTop' | 
                   'lowerLipTop' | 'upperLipBottom' | 'lowerLipBottom';
```
