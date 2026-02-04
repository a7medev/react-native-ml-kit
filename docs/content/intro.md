---
sidebar_position: 1
slug: /
---

# React Native ML Kit

## Introduction

`react-native-ml-kit` is a native module for Expo and React Native that lets you use the [ML Kit](https://developers.google.com/ml-kit) library in your Expo app.

## Available Modules

Currently the following modules are available:

- [Face Detection](./face-detection)
- [Identify Languages](./identify-languages)
- [Image Labeling](./image-labeling)
- [Text Recognition](./text-recognition)
- [Barcode Scanning](./barcode-scanning)
- [Translate Text](./translate-text)

We will be adding more modules in the future, and especially welcome PRs that add support for new MLKit Libraries! Check out the contributing guide for more information on how to contribute.

## Installation

Each module is published as a separate npm package. For specific Installation instructions for a particular module check the following pages:

- [Face Detection](./face-detection)
- [Identify Languages](./identify-languages)
- [Image Labeling](./image-labeling)
- [Text Recognition](./text-recognition)
- [Barcode Scanning](./barcode-scanning)
- [Translate Text](./translate-text)

## FAQ

### Why is each module a separate package?

Because the bundled TFLite modules are quite large, and we want to give you the option to only include the modules you need. Logic and classes shared by all the types have been extracted into `react-native-mlkit-core`, to reduce code duplication.

### Is RN MLKit compatible with all platforms?

Yes, all modules are supported on both Android and iOS.

### Is this Expo supported?

Yes, it is supported in Expo.
