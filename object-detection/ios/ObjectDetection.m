#import "ObjectDetection.h"

@import MLKitVision.MLKVisionImage;
@import MLKitObjectDetection.MLKObjectDetectorOptions;
@import MLKitObjectDetectionCommon.MLKObjectDetector;
@import MLKitObjectDetectionCommon.MLKObject;
@import MLKitObjectDetectionCommon.MLKObjectLabel;

@implementation ObjectDetection

RCT_EXPORT_MODULE()



RCT_EXPORT_METHOD(detectSingleImage:(NSDictionary *)optionsMap
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *url = [optionsMap objectForKey:@"url"];
    bool shouldEnableMultipleObjects = [optionsMap objectForKey:@"shouldEnableMultipleObjects"];
    bool shouldEnableClassification = [optionsMap objectForKey:@"shouldEnableClassification"];

    NSURL *_url = [NSURL URLWithString:url];
    NSData *imageData = [NSData dataWithContentsOfURL:_url];
    UIImage *image = [UIImage imageWithData:imageData];
    
    // Multiple object detection in static images
    MLKObjectDetectorOptions *options = [[MLKObjectDetectorOptions alloc] init];
    options.detectorMode = MLKObjectDetectorModeSingleImage;
    options.shouldEnableMultipleObjects = shouldEnableMultipleObjects;
    options.shouldEnableClassification = shouldEnableClassification;
    
    MLKObjectDetector *objectDetector = [MLKObjectDetector objectDetectorWithOptions:options];
    
    MLKVisionImage *visionImage = [[MLKVisionImage alloc] initWithImage:image];
    visionImage.orientation = image.imageOrientation;
    
    [objectDetector
        processImage:visionImage
        completion:^(NSArray * _Nullable objects,
                     NSError * _Nullable error) {

        if (error != nil) {
            return reject(@"Object Detection", @"Object Detection failed", error);
        }

        NSMutableArray *result = [NSMutableArray array];
        
        for (MLKObject *object in objects) {
            CGRect frame = object.frame;
            NSNumber *trackingID = object.trackingID;
            
            NSString *trackingIDResult = [trackingID stringValue];
            
            for (MLKObjectLabel *label in object.labels) {
                [result addObject:@{
                    @"frameX": @(frame.origin.x),
                    @"frameY": @(frame.origin.y),
                    @"frameWidth": @(frame.size.width),
                    @"frameHeight": @(frame.size.height),
                    @"text": label.text,
                    @"confidence": @(label.confidence),
                    @"index": @(label.index)
                }];
            }
        }
        
        resolve(result);
      }];
}

@end
