---
sidebar_position: 4
title: API Reference
---

# API Reference

## Methods

### `scan(imageURL: string): Promise<Barcode[]>`

Scans an image for barcodes. The native module exposes a single method `scan` that takes one string argument (the image URL/path).

| Parameter   | Type     | Description                                                                 |
| :---------- | :------- | :-------------------------------------------------------------------------- |
| `imageURL`  | `string` | Local file URI (e.g. `file:///...`). On **Android** only, `http://` or `https://` URLs are also supported (image is downloaded then scanned). |

**Returns:** `Promise<Barcode[]>` — List of detected barcodes (empty array if none). Rejects with Barcode scanning failed (Android) or Barcode Scanning failed (iOS) on error.

---

## Types

### `Barcode`

```typescript
interface Barcode {
  format: BarcodeFormat;
  /** @deprecated Use displayValue or rawValue instead. */
  value: string;
  rawValue: string;
  displayValue: string;
}
```

- **`format`**: Barcode type (number; use `BarcodeFormat` enum for comparison).
- **`rawValue`**: Machine-readable string (from native `rawValue` / `getRawValue()`).
- **`displayValue`**: Human-readable string when available (from native `displayValue` / `getDisplayValue()`).
- **`value`**: Deprecated; use `displayValue` or `rawValue`. On Android it equals `rawValue`; on iOS it equals `displayValue`.

### `BarcodeFormat`

Enum of supported formats (values match the native ML Kit format codes):

```typescript
enum BarcodeFormat {
  UNKNOWN = -1,
  ALL_FORMATS = 0,
  CODE_128 = 1,
  CODE_39 = 2,
  CODE_93 = 4,
  CODABAR = 8,
  DATA_MATRIX = 16,
  EAN_13 = 32,
  EAN_8 = 64,
  ITF = 128,
  QR_CODE = 256,
  UPC_A = 512,
  UPC_E = 1024,
  PDF417 = 2048,
  AZTEC = 4096,
}
```

Example: checking for QR codes only:

```javascript
import BarcodeScanning, { BarcodeFormat } from '@react-native-ml-kit/barcode-scanning';

const barcodes = await BarcodeScanning.scan(uri);
const qrCodes = barcodes.filter((b) => b.format === BarcodeFormat.QR_CODE);
```
