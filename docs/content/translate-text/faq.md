---
sidebar_position: 5
title: FAQ / Troubleshooting
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# FAQ / Troubleshooting

## Common issues

### No translation on iOS

Translation is **not implemented** on iOS in this package. The iOS native module (`TranslateText.m`) does not expose a `translate` method; only Android (`TranslateTextModule.java`) implements it. Use this module on Android only, or guard calls by platform.

### TranslateText is null / doesn't seem to be linked

The native module is not linked or the app was not rebuilt after installing the package.

- **Expo**: Use a **development build** (not Expo Go), and run on Android for translation.
- **Bare**: Rebuild the Android app after installing the package.

### TEXT_TRANSLATE_FAILED / Text cannot be null

Android rejects when `text` is null (see `TranslateTextModule.java`). Ensure you pass a non-empty string in the `text` option.

### Source language cannot be null / Target language cannot be null

Android uses `TranslateLanguage.fromLanguageTag(sourceLanguage)` and `fromLanguageTag(targetLanguage)`. If the tag is null or invalid, the native code rejects. Use valid language codes from the `TranslateLanguage` enum (e.g. `en`, `es`, `fr`).

### `requireWifi` does not seem to apply

In `TranslateTextModule.java` (line 87), the download conditions use `hasKey('requiresWifi')` for the presence check but `getBoolean('requireWifi')` for the value. The JS API sends `requireWifi` (no s). Because the native checks for the key `requiresWifi`, the condition is never true when you pass `requireWifi: true` from JS. So the Wi‑Fi-only option does not take effect unless the native code is fixed to use `hasKey('requireWifi')`.

### `requireCharging` only on Android 24+

The native code uses `requireCharging` only when `Build.VERSION.SDK_INT >= Build.VERSION_CODES.N` (API 24). On older devices, this option is ignored.
