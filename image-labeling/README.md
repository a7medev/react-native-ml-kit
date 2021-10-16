# @react-native-mlkit/image-labeling

## Getting started

`npm install @react-native-mlkit/image-labeling --save`

### Linking

#### React Native > 0.59

[CLI autolink feature](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) links the module while building the app.

#### React Native <= 0.59

`react-native link @react-native-mlkit/image-labeling`

### Installing Pods

On iOS, use CocoaPods to add the native RNMLKitImageLabeling to your project:

`npx pod-install`

## Usage

```javascript
import ImageLabeling from '@react-native-mlkit/image-labeling';

const labels = await ImageLabeling.label(imageURL);
```
