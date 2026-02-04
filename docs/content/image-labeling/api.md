---
sidebar_position: 4
title: API Reference
---

# API Reference

## Methods

### `label(imageURL: string): Promise<Label[]>`

Labels an image and returns the predicted labels above the confidence threshold.

| Parameter  | Type     | Description                                                                 |
| :--------- | :------- | :-------------------------------------------------------------------------- |
| `imageURL` | `string` | Local file URI (e.g. `file:///...`). On **Android** only, `http(s)` URLs are also supported. |

**Returns:** `Promise<Label[]>` — Array of labels (empty if none meet the threshold). Rejects with Image labeling failed (Android) or code Image Labeling / message Image labeling failed (iOS).

**Native confidence threshold:** fixed at **0.5** on both Android and iOS (see `ImageLabelingModule.java` and `ImageLabeling.m`).

## Types

### `Label`

```typescript
export interface Label {
  text: string;
  confidence: number;
  index: number;
}
```

- **`text`**: Predicted label text from native ML Kit.
- **`confidence`**: Model confidence as a number from 0 to 1.
- **`index`**: Native label index from ML Kit.

