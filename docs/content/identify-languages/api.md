---
sidebar_position: 4
title: API Reference
---

# API Reference

The native module is registered as `IdentifyLanguages` (Android: `IdentifyLanguagesModule.java`, iOS: `IdentifyLanguages.m`). The JS package exports it as the default export `IdentifyLanguage`.

## Methods

### `identify(text: string): Promise<string>`

Identifies the most likely language of the given text.

| Parameter | Type     | Description        |
| :-------- | :------- | :----------------- |
| `text`    | `string` | Input text to analyze. |

**Returns:** `Promise<string>` — A [BCP-47](https://en.wikipedia.org/wiki/IETF_language_tag) language code (e.g. `en`, `fr`), or `und` if the language could not be determined. May be `null` in edge cases (e.g. Android `identifyLanguage` can return null).

**Rejects:** With message Language identification failed (Android) or code Identify Languages and message Language identification failed (iOS).

---

### `identifyPossible(text: string): Promise<IdentifiedLanguage[]>`

Returns possible languages for the text with confidence scores.

| Parameter | Type     | Description        |
| :-------- | :------- | :----------------- |
| `text`    | `string` | Input text to analyze. |

**Returns:** `Promise<IdentifiedLanguage[]>` — Array of `{ language, confidence }`. Native: Android uses `getLanguageTag()` and `getConfidence()` (IdentifyLanguagesModule.java); iOS uses `languageTag` and `confidence` (IdentifyLanguages.m). Order is as returned by the native API (no sorting in the bridge).

**Rejects:** Same as `identify`.

---

## Types

### `IdentifiedLanguage`

```typescript
interface IdentifiedLanguage {
  /** BCP-47 language code */
  language: string;
  confidence: number;
}
```

- **`language`**: From native `getLanguageTag()` (Android) or `languageTag` (iOS).
- **`confidence`**: From native `getConfidence()` (Android) or `confidence` (iOS); value between 0 and 1.
