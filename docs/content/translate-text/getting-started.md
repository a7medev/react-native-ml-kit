---
sidebar_position: 2
title: Getting Started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Getting Started

## Platform Support

| Android | iOS |
| :-----: | :-: |
|   ✅    | ❌  |

Translation is implemented only on **Android**. The iOS native module in this package does not implement `translate` (see `translate-text/ios/TranslateText.m`).

## Installation

<Tabs>
  <TabItem value="npm" label="npm">

  ```bash
  npm install @react-native-ml-kit/translate-text
  ```

  </TabItem>
  <TabItem value="yarn" label="Yarn">

  ```bash
  yarn add @react-native-ml-kit/translate-text
  ```

  </TabItem>
</Tabs>

## Project Setup

<Tabs>
  <TabItem value="expo" label="Expo">

  :::info Development Build Required
  This package uses native code and will **not** work in Expo Go.
  :::

  Rebuild your project to include the native module:

  ```bash
  npx expo prebuild
  npx expo run:android
  ```

  Use only on Android; translation is not available on iOS in this package.

  </TabItem>
  <TabItem value="bare" label="Bare React Native">

  ### Android

  No additional setup required (autolinking).

  ### iOS

  Translation is not implemented. The native iOS module does not expose a `translate` method.

  </TabItem>
</Tabs>
