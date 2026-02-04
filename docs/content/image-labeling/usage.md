---
sidebar_position: 3
title: Usage
---

# Usage

## Basic Usage

Import the module and call `label` with the image URL/path. It returns an array of predicted labels.

```javascript
import ImageLabeling from '@react-native-ml-kit/image-labeling';

const labelImage = async (imagePath) => {
  try {
    const labels = await ImageLabeling.label(imagePath);
    console.log('Labels:', labels);

    labels.forEach((label) => {
      console.log(label.text, label.confidence, label.index);
    });
  } catch (error) {
    console.error('Image labeling failed:', error);
  }
};
```

## Input Image

`label` accepts:

- **Local file URI**: e.g. `file:///path/to/image.jpg` (from image picker or camera).
- **Android only**: `http://` or `https://` URLs (image is downloaded and then labeled).

For best cross-platform behavior, prefer a local file URI.

### Using Expo Image Picker

```javascript
import * as ImagePicker from 'expo-image-picker';
import ImageLabeling from '@react-native-ml-kit/image-labeling';

const result = await ImagePicker.launchImageLibraryAsync();
if (!result.canceled) {
  const uri = result.assets[0].uri;
  const labels = await ImageLabeling.label(uri);
}
```

### No labels returned

If nothing matches above the confidence threshold, the module returns an empty array `[]`.

