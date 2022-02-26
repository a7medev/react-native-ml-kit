# @react-native-ml-kit/translate-text

React Native On-Device Text Translation w/ Google ML Kit

> **⚠ WARNING: Don't use this in production.**  
> This package is still in alpha release, so it's not recommended to use it in production until it's fully stable, however using it for testing purposes is helpful.

## Getting started

`npm install @react-native-ml-kit/translate-text --save`

### Linking

#### React Native > 0.59

[CLI autolink feature](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) links the module while building the app.

#### React Native <= 0.59

`react-native link @react-native-ml-kit/translate-text`

### Installing Pods

On iOS, use CocoaPods to add the native RNMLKitTranslateText to your project:

`npx pod-install`

## Usage

```javascript
import TranslateText, {
  TranslateLanguage,
} from '@react-native-ml-kit/translate-text';

const translatedText = await TranslateText.translate({
  text: 'مرحبا بالعالم',
  sourceLanguage: TranslateLanguage.ARABIC,
  targetLanguage: TranslateLanguage.ENGLISH,
  downloadModelIfNeeded: true,
});
```
