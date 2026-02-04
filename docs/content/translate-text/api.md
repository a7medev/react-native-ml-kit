---
sidebar_position: 4
title: API Reference
---

# API Reference

The native module is registered as `TranslateText`. Only **Android** implements `translate` (`TranslateTextModule.java`). iOS (`TranslateText.m`) does not implement translation.

## Methods

### `translate(options: TranslateTextOptions): Promise<string>`

Translates text from the source language to the target language. **Android only.**

| Option | Type | Required | Description |
| :----- | :--- | :------- | :----------- |
| `text` | `string` | Yes | Text to translate. Native rejects with Text cannot be null if null. |
| `sourceLanguage` | `TranslateLanguage` or string | Yes | Source language code (e.g. `en`). Native uses `TranslateLanguage.fromLanguageTag()`; rejects with Source language cannot be null if null/invalid. |
| `targetLanguage` | `TranslateLanguage` or string | Yes | Target language code. Rejects with Target language cannot be null if null/invalid. |
| `downloadModelIfNeeded` | `boolean` | No | If `true`, Android downloads the model if needed before translating. Default: `false`. |
| `requireWifi` | `boolean` | No | When `downloadModelIfNeeded` is true, require Wi‑Fi for download. Default: `false`. |
| `requireCharging` | `boolean` | No | When `downloadModelIfNeeded` is true, require charging. **Android API 24+** only. Default: `false`. |

**Returns:** `Promise<string>` — The translated text. (The package types use `TranslateTextResult`, which is an empty interface; the native implementation resolves with the string from `translator.translate(text)`.)

**Rejects:** Code `TEXT_TRANSLATE_FAILED` with message or exception (e.g. Text cannot be null, Source language cannot be null, Target language cannot be null, or the failure from the translator/download).

---

## Types

### `TranslateTextOptions` (from `index.ts`)

```typescript
interface TranslateTextOptions {
  text: string;
  sourceLanguage: TranslateLanguage;
  targetLanguage: TranslateLanguage;
  downloadModelIfNeeded?: boolean;
  requireWifi?: boolean;
  requireCharging?: boolean;
}
```

### `TranslateLanguage`

Exported enum of language codes. For example:

```ts
TranslateLanguage.ENGLISH = 'en'
TranslateLanguage.SPANISH = 'es'
```

Values are passed to the native side; Android uses `TranslateLanguage.fromLanguageTag()` to obtain the ML Kit language constant. See index.ts for the full list (Afrikaans, Albanian, Arabic, … Welsh).
