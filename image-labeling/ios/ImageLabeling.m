#import "ImageLabeling.h"

@import MLKitVision.MLKVisionImage;
@import MLKitImageLabeling.MLKImageLabelerOptions;
@import MLKitImageLabelingCommon;

@implementation ImageLabeling

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(label: (nonnull NSString*)url
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSURL *_url = [NSURL URLWithString:url];
    NSData *imageData = [NSData dataWithContentsOfURL:_url];
    UIImage *image = [UIImage imageWithData:imageData];
    MLKVisionImage *visionImage = [[MLKVisionImage alloc] initWithImage:image];
    MLKImageLabelerOptions *options =
    [[MLKImageLabelerOptions alloc] init];
    options.confidenceThreshold = @(0.5);
    MLKImageLabeler *labeler =
    [MLKImageLabeler imageLabelerWithOptions:options];
    
    [labeler processImage:visionImage
               completion:^(NSArray *_Nullable labels,
                            NSError *_Nullable error) {
        if (error != nil || labels == nil) {
            return reject(@"Image Labeling", @"Image labeling failed", error);
        }
        
        NSMutableArray *result = [NSMutableArray array];
        
        for (MLKImageLabel *label in labels) {
            [result addObject:@{
                @"text": label.text,
                @"confidence": @(label.confidence),
                @"index": @(label.index)
            }];
        }
        
        resolve(result);
    }];
}

@end
