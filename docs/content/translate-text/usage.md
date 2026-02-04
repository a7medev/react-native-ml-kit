---
sidebar_position: 3
title: Usage
---

# Usage

:::caution Android only
The `translate` method is implemented only on Android. On iOS, the native module does not implement translation.
:::

## Basic usage

Import the module and call `translate` with an options object. The native module (`TranslateTextModule.java`) expects `text`, `sourceLanguage`, and `targetLanguage`. It resolves with the **translated string** (not an object).

```javascript
import TranslateText, { TranslateLanguage } from '@react-native-ml-kit/translate-text';

const result = await TranslateText.translate({
  text: 'Hello, world!',
  sourceLanguage: TranslateLanguage.ENGLISH,
  targetLanguage: TranslateLanguage.SPANISH,
});
console.log(result); // translated string, e.g. ¡Hola, mundo!
```

## Options (from native)

- **`text`** (required): String to translate. Android rejects with Text cannot be null if missing.
- **`sourceLanguage`**: Language code to translate from (e.g. `TranslateLanguage.ENGLISH` or `en`). Android uses `TranslateLanguage.fromLanguageTag()` and rejects with Source language cannot be null if invalid or null.
- **`targetLanguage`**: Language code to translate to. Rejects with Target language cannot be null if invalid or null.
- **`downloadModelIfNeeded`** (optional): If `true`, Android downloads the model if needed before translating (see `TranslateTextModule.java`).
- **`requireWifi`** (optional): When `downloadModelIfNeeded` is true, require Wi‑Fi for the download. (Note: Android code checks `requiresWifi` in one place and `requireWifi` for the value; if the option does not apply, check the native key.)
- **`requireCharging`** (optional): When `downloadModelIfNeeded` is true, require device charging for the download. **Android only**, and only on API 24+ (see `Build.VERSION.SDK_INT >= Build.VERSION_CODES.N`).

## Return value

The promise **resolves with the translated string** (the value returned by the Android translator). The TypeScript type `TranslateTextResult` in the package is currently an empty interface; at runtime you get a string.
