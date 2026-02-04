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
This package requires a minimum iOS deployment target of **15.5**.
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

### App crashes on launch (iOS)

Make sure CocoaPods are installed and up to date:

```bash
cd ios && pod install
```

Then rebuild the app.

### BarcodeScanning is null / doesn't seem to be linked

The native module is not linked or the app wasn’t rebuilt after adding the package.

- **Expo**: Use a **development build** (e.g. `npx expo run:ios` / `run:android`). This will **not** work in Expo Go.
- **Bare**: Rebuild the native app after installing:
  ```bash
  npx react-native run-ios
  # or
  npx react-native run-android
  ```

### No barcodes detected (empty array)

- **Image source**: Use a **local file URI** (e.g. `file:///...`). On iOS, remote `http(s)` URLs are not supported; use a downloaded/local path.
- **Image quality**: Use a clear, well-lit image. Blur, glare, or very small barcodes often fail.
- **Orientation**: Try with the barcode upright and fully in frame.

### iOS build fails or “module not found” for ML Kit

- Run `cd ios && pod install` and ensure there are no CocoaPods errors.
- Clean and rebuild: e.g. in Xcode, **Product → Clean Build Folder**, then build again.
- If you use a different React Native or CocoaPods setup, check that `RNMLKitBarcodeScanning` is listed under **Pods** and that the app target links it.

### Android: “Barcode scanning failed” or crash

- Ensure the image URI is valid. For local files use a `content://` or `file://` URI that your app can read.
- If using a custom camera or capture pipeline, avoid passing a bitmap with non-zero rotation without converting to a proper file/URI first; ML Kit can be sensitive to rotation on some versions.

### Deprecated `value` on Barcode

The `value` field on `Barcode` is deprecated. Use **`displayValue`** for user-facing text and **`rawValue`** for the full machine-readable string.
