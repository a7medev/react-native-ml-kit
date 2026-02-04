---
sidebar_position: 5
title: FAQ / Troubleshooting
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# FAQ / Troubleshooting

## Common Issues

### Build failed on iOS (Deployment Target)

:::note iOS 15.5+ Required
This package requires a minimum iOS deployment target of **15.5** (see `RNMLKitTextRecognition.podspec`).
:::

<Tabs>
  <TabItem value="expo" label="Expo">

  1. Install the plugin:
     ```bash
     npx expo install expo-build-properties
     ```
  2. In `app.json` or `app.config.js`:
     ```json
     {
       "expo": {
         "plugins": [
           [
             "expo-build-properties",
             {
               "ios": {
                 "deploymentTarget": "15.5"
               }
             }
           ]
         ]
       }
     }
     ```

  </TabItem>
  <TabItem value="bare" label="Bare React Native">

  In `ios/Podfile`:

  ```ruby
  platform :ios, '15.5'
  ```

  </TabItem>
</Tabs>

### TextRecognition is null / doesn't seem to be linked

The native module is not linked or the app was not rebuilt after installing the package.

- **Expo**: Use a **development build** (not Expo Go).
- **Bare**: Rebuild the app and run `cd ios && pod install` for iOS.

### Unsupported script on iOS

The iOS native module only accepts `nil`/Latin, Chinese, Devanagari, Japanese, or Korean (see `TextRecognition.m`, lines 95–106). Any other script value causes reject with code Text Recognition and message Unsupported script. Use the `TextRecognitionScript` enum so the correct string is passed.

### Android: Text recognition failed

- Use a valid local URI (`file://` or `content://`) or, on Android only, an `http(s)` URL.
- Ensure the image is readable and not corrupted.

### Empty or poor results

- Use a clear, well-lit image with legible text.
- Choose the correct **script** for the text (Latin, Chinese, Devanagari, Japanese, Korean).
