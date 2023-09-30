import { NativeModules, Platform } from 'react-native';

export enum BarcodeFormat {
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

export interface Barcode {
  format: BarcodeFormat;
  value: string;
}

interface IBarcodeScanning {
  scan: (imageURL: string) => Promise<Barcode[]>;
}

const LINKING_ERROR =
  `The package '@react-native-ml-kit/barcode-scanning' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const BarcodeScanning: IBarcodeScanning = NativeModules.BarcodeScanning
  ? NativeModules.BarcodeScanning
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default BarcodeScanning;
