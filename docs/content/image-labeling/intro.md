---
sidebar_position: 1
title: Introduction
slug: /image-labeling
---

# Image Labeling

On-device image labeling using Google ML Kit. Predicts the most likely labels for an image and returns a confidence score for each label.

## Features

- **Offline**: Runs fully on-device.
- **Simple API**: Call `ImageLabeling.label(imageURL)` and get labels back.
- **Confidence + index**: Each label includes `confidence` and `index` from the native ML Kit result.

