---
sidebar_position: 1
title: Introduction
slug: /identify-languages
---

# Identify Languages

On-device language identification using Google ML Kit. Detects the language of a text string and returns BCP-47 language codes.

## Features

- **Single language**: `identify(text)` returns the most likely BCP-47 language code (or `und` if unknown).
- **Multiple possibilities**: `identifyPossible(text)` returns a list of languages with confidence scores.
- **Text input only**: No image or file—just pass a string. Works offline.
