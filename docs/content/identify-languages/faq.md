---
sidebar_position: 5
title: FAQ / Troubleshooting
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# FAQ / Troubleshooting

## Common issues

### Build failed on iOS (deployment target)

:::note iOS 15.5+ required
This package requires a minimum iOS deployment target of **15.5** (see `RNMLKitIdentifyLanguages.podspec`).
:::

<Tabs>
  <TabItem value="expo" label="Expo">

  1. Install the plugin:
     ```bash
     npx expo install expo-build-properties
     ```
  2. In `app.json` or `app.config.js`, set `expo.plugins` with `expo-build-properties` and `ios.deploymentTarget: 15.5`.

  </TabItem>
  <TabItem value="bare" label="Bare React Native">

  In `ios/Podfile`:

  ```ruby
  platform :ios, '15.5'
  ```

  </TabItem>
</Tabs>

### IdentifyLanguage is null / doesn't seem to be linked

The native module is not linked or the app was not rebuilt after installing the package.

- **Expo**: Use a **development build** (not Expo Go).
- **Bare**: Rebuild the app and run `cd ios && pod install` for iOS.

### Language identification failed

- Ensure you pass a non-empty string; very short or empty text may fail or return `und`.
- Reject message is Language identification failed (Android) or code Identify Languages with message Language identification failed (iOS), as in the native modules.

### Result is und or null

ML Kit returns `und` when it cannot identify the language. Very short input, mixed languages, or non-language content can cause this. Use longer, single-language text when possible.
