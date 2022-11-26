#import "ObjectDetection.h"

@import MLKitVision.MLKVisionImage;

@implementation ObjectDetection

RCT_EXPORT_MODULE()



RCT_EXPORT_METHOD(label:(NSDictionary *)optionsMap
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    
    resolve(nil);
}

@end
