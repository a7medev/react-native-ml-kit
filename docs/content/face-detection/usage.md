---
sidebar_position: 3
title: Usage
---

# Usage

## Basic Usage

To detect faces in an image, import the `FaceDetection` module and call the `detect` method with the local path to the image.

```javascript
import FaceDetection from '@react-native-ml-kit/face-detection';

// ...

const detectFaces = async (imagePath) => {
  try {
    const faces = await FaceDetection.detect(imagePath, {
      landmarkMode: 'all',
      contourMode: 'all',
    });

    console.log('Faces:', faces);
    
    faces.forEach(face => {
      console.log('Face Frame:', face.frame);
      if (face.smilingProbability) {
        console.log('Smiling Probability:', face.smilingProbability);
      }
    });
  } catch (error) {
    console.error('Error detecting faces:', error);
  }
};
```

## Input Image

The `detect` method accepts a local file path (URI). You can get this from libraries like `react-native-image-picker` or `react-native-vision-camera`.

### Using Expo Image Picker

If you are using Expo, simply pass the `uri` from the asset:

```javascript
import * as ImagePicker from 'expo-image-picker';

// ...
const result = await ImagePicker.launchImageLibraryAsync();

if (!result.canceled) {
  const uri = result.assets[0].uri;
  // Pass the URI directly to face detection
  const faces = await FaceDetection.detect(uri);
}
```
