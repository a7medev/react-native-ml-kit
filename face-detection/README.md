# @react-native-ml-kit/face-detection

React Native On-Device Face Detection w/ Google ML Kit

## Getting started

`npm install @react-native-ml-kit/face-detection --save`

### Linking

#### React Native > 0.59

[CLI autolink feature](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) links the module while building the app.

#### React Native <= 0.59

`react-native link @react-native-ml-kit/face-detection`

### Installing Pods

On iOS, use CocoaPods to add the native RNMLKitFaceDetection to your project:

`npx pod-install`

## Usage

```javascript
import FaceDetection from '@react-native-ml-kit/face-detection';

const faces = FaceDetection.detect(imageURL, { landmarkMode: 'all' });
```
