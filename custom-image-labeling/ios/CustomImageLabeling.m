#import "CustomImageLabeling.h"

@import MLKitVision.MLKVisionImage;
@import MLKitImageLabeling.MLKImageLabelerOptions;
@import MLKitImageLabelingCommon;
@import MLKitCommon.MLKLocalModel;
@import MLKitImageLabelingCustom.MLKCustomImageLabelerOptions;

@implementation CustomImageLabeling

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(label:(NSDictionary *)optionsMap
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *url = @"file:";
    NSString *inputUrl = [optionsMap objectForKey:@"url"];
    url = [url stringByAppendingString:inputUrl];
    
    NSString *localModelFilename = [optionsMap objectForKey:@"localModelFilename"];
    NSString *localLabelsFilename = [optionsMap objectForKey:@"localLabelsFilename"];

    NSDecimalNumber *confidence = [optionsMap objectForKey:@"confidence"];
    NSString *mainBundlePath = [[NSBundle mainBundle] bundlePath];
    mainBundlePath = [mainBundlePath stringByAppendingString:@"/"];
    
    //specify the local model path
    NSString *localModelPath = [mainBundlePath stringByAppendingString:localModelFilename];
    
    // specify the local label path
    NSString *localLabelsPath = [mainBundlePath stringByAppendingString:localLabelsFilename];
    
    // load label data
    NSString *localLabelsText = [[NSString alloc]initWithContentsOfFile:localLabelsPath encoding:NSUTF8StringEncoding error:nil];
    
    // load label data into an index
    NSArray *localLabels = [localLabelsText componentsSeparatedByString:@"\n"];
    
    // load the local model
    MLKLocalModel *localModel = [[MLKLocalModel alloc] initWithPath:localModelPath];

    NSURL *_url = [NSURL URLWithString:url];
    NSData *imageData = [NSData dataWithContentsOfURL:_url];
    UIImage *image = [UIImage imageWithData:imageData];
    MLKVisionImage *visionImage = [[MLKVisionImage alloc] initWithImage:image];
    MLKCustomImageLabelerOptions *options = [[MLKCustomImageLabelerOptions alloc] initWithLocalModel:localModel];
    options.confidenceThreshold = confidence;
    MLKImageLabeler *labeler = [MLKImageLabeler imageLabelerWithOptions:options];
    
    [labeler processImage:visionImage
               completion:^(NSArray *_Nullable labels,
                            NSError *_Nullable error) {
        if (error != nil || labels == nil) {
            return reject(@"Custom Image Labeling", @"Custom Image labeling failed", error);
        }
        
        NSMutableArray *result = [NSMutableArray array];
        
        for (MLKImageLabel *label in labels) {
            [result addObject:@{
                @"text": localLabels[label.index], // extract the label from the label data
                @"confidence": @(label.confidence),
                @"index": @(label.index)
            }];
        }
        
        resolve(result);
    }];
}

@end
