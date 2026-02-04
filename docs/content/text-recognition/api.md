---
sidebar_position: 4
title: API Reference
---

# API Reference

## Methods

### `recognize(imageURL: string, script?: TextRecognitionScript): Promise<TextRecognitionResult>`

Recognizes text in an image. Optional second argument selects the script (default is Latin).

| Parameter  | Type                    | Description                                                                 |
| :--------- | :---------------------- | :-------------------------------------------------------------------------- |
| `imageURL` | `string`                | Local file URI (e.g. `file:///...`). On **Android** only, `http(s)` URLs are supported. |
| `script`   | `TextRecognitionScript` | Optional. `'Latin'`, `'Chinese'`, `'Devanagari'`, `'Japanese'`, or `'Korean'`. Default: `TextRecognitionScript.LATIN`. On Android, any other value falls back to Latin; on iOS, unsupported script rejects. |

**Returns:** `Promise<TextRecognitionResult>` — `{ text, blocks }`. Rejects with Text recognition failed (Android) or code Text Recognition / message Text recognition failed (iOS). On iOS only, unsupported `script` rejects with message Unsupported script.

---

## Types

Defined in `index.ts`. The return shape matches what the native modules produce: **Android** (`TextRecognitionModule.java`) builds `text`, `blocks` (each block/line/element with `text`, optional `frame`, optional `cornerPoints`, `recognizedLanguages`; lines also have `confidenceScore` and `rotationDegree`). **iOS** (`TextRecognition.m`) returns the same structure but lines do not include `confidenceScore` or `rotationDegree`.

### `TextRecognitionResult`

```typescript
interface TextRecognitionResult {
  text: string;
  blocks: TextBlock[];
}
```

### `TextBlock`

```typescript
interface TextBlock {
  text: string;
  frame?: Frame;
  cornerPoints?: CornerPoints;
  lines: TextLine[];
  recognizedLanguages: Language[];
}
```

### `TextLine`

```typescript
interface TextLine {
  text: string;
  frame?: Frame;
  cornerPoints?: CornerPoints;
  elements: TextElement[];
  recognizedLanguages: Language[];
  confidenceScore?: number;   // Android only
  rotationDegree?: number;    // Android only (degrees, range [-180, 180])
}
```

### `TextElement`

```typescript
interface TextElement {
  text: string;
  frame?: Frame;
  cornerPoints?: CornerPoints;
}
```

### `Frame`

```typescript
interface Frame {
  width: number;
  height: number;
  top: number;
  left: number;
}
```

### `Point` / `CornerPoints`

```typescript
interface Point { x: number; y: number; }
type CornerPoints = readonly [Point, Point, Point, Point];
```

### `Language`

```typescript
interface Language {
  languageCode: string;
}
```

### `TextRecognitionScript`

```typescript
enum TextRecognitionScript {
  LATIN = 'Latin',
  CHINESE = 'Chinese',
  DEVANAGARI = 'Devanagari',
  JAPANESE = 'Japanese',
  KOREAN = 'Korean',
}
```

Native modules expect the string value (e.g. Latin, Chinese). Unsupported script on iOS causes reject with Unsupported script.
