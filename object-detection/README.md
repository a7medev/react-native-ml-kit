# @react-native-ml-kit/object-detection

React Native On-Device Custom Image Labeling w/ Google ML Kit

## Getting started

`npm install @react-native-ml-kit/object-detection --save`

### Linking

#### React Native > 0.59

[CLI autolink feature](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) links the module while building the app.

#### React Native <= 0.59

`react-native link @react-native-ml-kit/object-detection`

### Installing Pods

On iOS, use CocoaPods to add the native RNMLKitObjectDetection to your project:

`npx pod-install`

## Usage

```javascript
import ObjectDetection from '@react-native-ml-kit/object-detection';

const labels = await ObjectDetection.label(imageURL);
```
