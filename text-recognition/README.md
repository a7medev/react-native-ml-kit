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

const result = await TextRecognition.recognize(imageURL);

console.log('Recognized text:', result.text);

for (let block of result.blocks) {
  console.log('Block text:', block.text);
  console.log('Block frame:', block.frame);

  for (let line of block.lines) {
    console.log('Line text:', line.text);
    console.log('Line frame:', line.frame);
  }
}
```

You can also recognize text in scripts other than Latin by specifying the needed script as below:

```js
import TextRecognition, {
  TextRecognitionScript,
} from '@react-native-ml-kit/text-recognition';

const result = await TextRecognition.recognize(
  imageURL,
  // Script for Japanese, you can also use Chinese, Korean, Divanagari and of course Latin.
  TextRecognitionScript.JAPANESE
);
```
