---
sidebar_position: 1
title: Introduction
slug: /translate-text
---

# Translate Text

On-device text translation using Google ML Kit. Translate text between languages using downloaded language models.

## Features

- **Android only**: The `translate` API is implemented only on Android (see `TranslateTextModule.java`). iOS has no translation implementation in this package.
- **Language codes**: Use the `TranslateLanguage` enum (e.g. `TranslateLanguage.ENGLISH`, `TranslateLanguage.SPANISH`); values are BCP-47-style codes (e.g. `en`, `es`).
- **Optional model download**: You can request that the model be downloaded if needed (`downloadModelIfNeeded`), with optional conditions (`requireWifi`, `requireCharging` on Android API 24+).
