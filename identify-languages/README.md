# @react-native-ml-kit/identify-languages

React Native On-Device Language Identification w/ Google ML Kit

> **⚠ WARNING: Don't use this in production.**  
> This package is still in alpha release, so it's not recommended to use it in production until it's fully stable, however using it for testing purposes is helpful.

## Getting started

`npm install @react-native-ml-kit/identify-languages --save`

### Linking

#### React Native > 0.59

[CLI autolink feature](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) links the module while building the app.

#### React Native <= 0.59

`react-native link @react-native-ml-kit/identify-languages`

### Installing Pods

On iOS, use CocoaPods to add the native RNMLKitIdentifyLanguages to your project:

`npx pod-install`

## Usage

```javascript
import IdentifyLanguages from '@react-native-ml-kit/identify-languages';

const lang = await IdentifyLanguages.identify('Ciao'); // "it" (Italian)

const possibleLangs = await IdentifyLanguages.identifyPossible('Ciao'); // [{ "language": "it", "confidence": 0.9789841771125793 }, { "confidence": 0.012451663613319397, "language": "zh-Latn" }]
```
