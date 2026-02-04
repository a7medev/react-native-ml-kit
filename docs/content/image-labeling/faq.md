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
This package requires a minimum iOS deployment target of **15.5** (see the module podspec).
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

### ImageLabeling is null / doesn't seem to be linked

Usually means the native module isn’t linked or the app wasn’t rebuilt after installing the package.

- **Expo**: Use a **development build** (not Expo Go).
- **Bare**: Rebuild the native app after installing, and ensure iOS pods are installed:
  ```bash
  cd ios && pod install
  ```

### Android: “Image labeling failed”

- Ensure the path is a readable local URI (`file://` or `content://`).
- If you pass `http(s)` URLs, that path is only handled on Android in the native module.

### iOS: build works on Android but fails on iOS

A user reported this pattern when installing multiple RN ML Kit modules, where Android builds but iOS doesn’t (see GitHub issue `#54`). Common fixes:

- Run `cd ios && pod install` and rebuild.
- Ensure your iOS deployment target is **15.5+**.
- Clean the build folder in Xcode and rebuild.

### Empty labels array `[]`

The native modules apply a fixed **confidence threshold of 0.5**, so low-confidence predictions are filtered out. Try a clearer image or a more “obvious” subject; otherwise you may get an empty result.

