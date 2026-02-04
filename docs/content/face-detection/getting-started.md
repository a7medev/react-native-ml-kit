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
|   ✅    | ✅  |

## Installation

<Tabs>
  <TabItem value="npm" label="npm">

  ```bash
  npm install @react-native-ml-kit/face-detection
  ```

  </TabItem>
  <TabItem value="yarn" label="Yarn">

  ```bash
  yarn add @react-native-ml-kit/face-detection
  ```

  </TabItem>
</Tabs>

## Project Setup

<Tabs>
  <TabItem value="expo" label="Expo">

  :::info Development Build Required
  This package enables native features and will **not** work in Expo Go.
  :::
  
  Rebuild your project to include the native code:

  ```bash
  npx expo prebuild
  # then
  npx expo run:ios
  # or
  npx expo run:android
  ```

  </TabItem>
  <TabItem value="bare" label="Bare React Native">

  ### iOS Setup
  
  Install the necessary pods:

  ```bash
  cd ios && pod install
  ```

  ### Android Setup

  No additional setup required (Autolinking).

  </TabItem>
</Tabs>
