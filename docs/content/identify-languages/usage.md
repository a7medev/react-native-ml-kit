---
sidebar_position: 3
title: Usage
---

# Usage

## Basic usage

Import the default export (the native module is named `IdentifyLanguages`; the package exports it as `IdentifyLanguage`). Pass a **text string**—no image or file.

### Single language

```javascript
import IdentifyLanguage from '@react-native-ml-kit/identify-languages';

const lang = await IdentifyLanguage.identify('Hello, how are you?');
console.log(lang); // e.g. en
```

### Possible languages with confidence

```javascript
import IdentifyLanguage, { IdentifiedLanguage } from '@react-native-ml-kit/identify-languages';

const possible = await IdentifyLanguage.identifyPossible('Bonjour le monde');
possible.forEach((item) => {
  console.log(item.language, item.confidence);
});
```

## Return values

- **`identify(text)`**: Resolves with a single string (BCP-47 language code, e.g. `en`, `fr`). ML Kit may return `und` when the language cannot be determined. On some platforms the result can be `null` in edge cases.
- **`identifyPossible(text)`**: Resolves with an array of `{ language, confidence }`. Each `language` is a BCP-47 tag (from native `getLanguageTag()` / `languageTag`); `confidence` is a number 0–1 (from native `getConfidence()` / `confidence`). Array order is whatever the native API returns (no sorting in the bridge).
