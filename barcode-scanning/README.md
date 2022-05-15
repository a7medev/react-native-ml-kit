# @react-native-ml-kit/barcode-scanning

React Native On-Device Barcode Scanning w/ Google ML Kit

## Getting started

`npm install @react-native-ml-kit/barcode-scanning --save`

### Linking

#### React Native > 0.59

[CLI autolink feature](https://github.com/react-native-community/cli/blob/master/docs/autolinking.md) links the module while building the app.

#### React Native <= 0.59

`react-native link @react-native-ml-kit/barcode-scanning`

### Installing Pods

On iOS, use CocoaPods to add the native RNMLKitBarcodeScanning to your project:

`npx pod-install`

## Usage

```javascript
import BarcodeScanning from '@react-native-ml-kit/barcode-scanning';

const barcodes = await BarcodeScanning.scan(imageURL);
for (let barcode of barcodes) {
  console.log(barcode.value, barcode.format);
}
```
