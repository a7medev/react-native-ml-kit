---
sidebar_position: 3
title: Usage
---

# Usage

## Basic Usage

Import the module and call `scan` with the image path (local file URI or `file://` path). It returns a list of detected barcodes.

```javascript
import BarcodeScanning, { BarcodeFormat } from '@react-native-ml-kit/barcode-scanning';

const scanBarcodes = async (imagePath) => {
  try {
    const barcodes = await BarcodeScanning.scan(imagePath);
    console.log('Barcodes:', barcodes);

    barcodes.forEach((barcode) => {
      console.log('Format:', barcode.format);
      console.log('Display:', barcode.displayValue);
      console.log('Raw:', barcode.rawValue);
    });
  } catch (error) {
    console.error('Scan failed:', error);
  }
};
```

## Input Image

`scan` accepts:

- **Local file URI**: e.g. `file:///path/to/image.jpg` (from image picker or camera).
- **Android only**: `http://` or `https://` URLs (image is downloaded and then scanned).

Use a local file path when possible for best compatibility on both platforms.

### Using Expo Image Picker

Pass the asset `uri` from the picker result:

```javascript
import * as ImagePicker from 'expo-image-picker';
import BarcodeScanning from '@react-native-ml-kit/barcode-scanning';

const result = await ImagePicker.launchImageLibraryAsync();

if (!result.canceled) {
  const uri = result.assets[0].uri;
  const barcodes = await BarcodeScanning.scan(uri);
}
```

### No barcodes in image

If the image has no barcodes or they aren’t detected, `scan` returns an empty array `[]`. Ensure the image is clear, well lit, and the barcode is not too small or skewed.
