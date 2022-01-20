# @react-native-ml-kit/text-recognition

React Native On-Device Text Recognition w/ Google ML Kit

## Getting started

`npm install @react-native-ml-kit/text-recognition --save`

### Linking

#### React Native > 0.59

[CLI autolink feature](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) links the module while building the app.

#### React Native <= 0.59

`react-native link @react-native-ml-kit/text-recognition`

### Installing Pods

On iOS, use CocoaPods to add the native RNMLKitTextRecognition to your project:

`npx pod-install`

## Usage

```javascript
import TextRecognition from '@react-native-ml-kit/text-recognition';

const result = await TextRecognition.recognize(TextURL);
```
