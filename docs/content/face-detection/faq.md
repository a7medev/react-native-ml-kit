---
sidebar_position: 6
title: FAQ / Troubleshooting
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Common Issues

### Build failed on iOS (Deployment Target)

:::note iOS 15.5+ Required
This package requires a minimum iOS deployment target of **15.5**.
:::

<Tabs>
  <TabItem value="expo" label="Expo">

  1. Install the plugin:
     ```bash title="Install expo-build-properties"
     npx expo install expo-build-properties
     ```
  2. Add to `app.json` or `app.config.js`:
     ```json title="app.json"
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

  Update your `Podfile`:

  ```ruby title="ios/Podfile"
  platform :ios, '15.5'
  ```

  </TabItem>
</Tabs>

### App crashes on launch (iOS)

Ensure pods are installed:

```bash title="Install iOS dependencies"
cd ios && pod install
```

### FaceDetection is null

Usually means the native module isn't linked.

- **Expo**: You must use a **Development Build**. This will **not** work in Expo Go.
- **Bare**: Rebuild your binary (`npx react-native run-android` / `run-ios`).

### Zero faces detected

- **Check Path**: Use a local file path (must start with `file://`).
- **Accuracy**: Try `performanceMode: 'accurate'`.
- **Face Size**: Check `minFaceSize` (default is 0.1).

