---
sidebar_position: 3
title: Usage
---

# Usage

## Basic Usage

Import the module and call `recognize` with the image URL/path. Optionally pass a script (default is Latin).

```javascript
import TextRecognition, { TextRecognitionScript } from '@react-native-ml-kit/text-recognition';

const runOCR = async (imagePath) => {
  try {
    // Latin script (default)
    const result = await TextRecognition.recognize(imagePath);
    console.log('Full text:', result.text);
    console.log('Blocks:', result.blocks);

    // Or specify script
    const chineseResult = await TextRecognition.recognize(
      imagePath,
      TextRecognitionScript.CHINESE
    );
  } catch (error) {
    console.error('Text recognition failed:', error);
  }
};
```

## Input Image

`recognize` accepts:

- **Local file URI**: e.g. `file:///path/to/image.jpg` (from image picker or camera).
- **Android only**: `http://` or `https://` URLs (image is downloaded then processed).

For best cross-platform behavior, use a local file URI.

### Using Expo Image Picker

```javascript
import * as ImagePicker from 'expo-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';

const result = await ImagePicker.launchImageLibraryAsync();
if (!result.canceled) {
  const uri = result.assets[0].uri;
  const { text, blocks } = await TextRecognition.recognize(uri);
}
```

### Script parameter

Use the `TextRecognitionScript` enum:

```ts
LATIN | CHINESE | DEVANAGARI | JAPANESE | KOREAN
```

On iOS, passing any other script string causes the native module to reject with Unsupported script.
