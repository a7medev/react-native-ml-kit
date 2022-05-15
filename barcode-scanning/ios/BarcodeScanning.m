#import "BarcodeScanning.h"

@import MLKitVision.MLKVisionImage;
@import MLKitBarcodeScanning.MLKBarcodeScannerOptions;
@import MLKitBarcodeScanning.MLKBarcodeScanner;
@import MLKitBarcodeScanning.MLKBarcode;

@implementation BarcodeScanning

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(scan
                  : (nonnull NSString *)url resolver
                  : (RCTPromiseResolveBlock)resolve rejecter
                  : (RCTPromiseRejectBlock)reject) {
  NSURL *_url = [NSURL URLWithString:url];
  NSData *imageData = [NSData dataWithContentsOfURL:_url];
  UIImage *image = [UIImage imageWithData:imageData];
  MLKVisionImage *visionImage = [[MLKVisionImage alloc] initWithImage:image];
  MLKBarcodeScanner *scanner = [MLKBarcodeScanner barcodeScanner];

  [scanner
      processImage:visionImage
        completion:^(NSArray *_Nullable barcodes, NSError *_Nullable error) {
          if (error != nil || barcodes == nil) {
            return reject(@"Barcode Scanning", @"Barcode Scanning failed",
                          error);
          }

          NSMutableArray *result = [NSMutableArray array];

          for (MLKBarcode *barcode in barcodes) {
            // Streamline format enum with Android
            NSNumber* format;
            switch (barcode.format) {
                case MLKBarcodeFormatAll:
                    format = @0; // Android uses 0 for "All"
                case MLKBarcodeFormatUnknown:
                    format = @-1; // Android used -1 for "Unknown"
                default:
                    format = @(barcode.format);
            }
              
            [result addObject:@{
              @"value": barcode.displayValue,
              @"format": format
            }];
          }

          resolve(result);
        }];
}

@end
