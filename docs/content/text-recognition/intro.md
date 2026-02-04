---
sidebar_position: 1
title: Introduction
slug: /text-recognition
---

# Text Recognition

On-device text recognition (OCR) using Google ML Kit. Extracts text from images with support for multiple scripts.

## Features

- **Multiple scripts**: Latin, Chinese, Devanagari, Japanese, and Korean.
- **Structured result**: Full text plus hierarchical blocks → lines → elements (words), with bounding boxes and corner points.
- **Language hints**: Each block and line can include `recognizedLanguages` (language code).
- **Android-only fields**: `confidenceScore` and `rotationDegree` on each line (see API).
