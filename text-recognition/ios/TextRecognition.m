#import "TextRecognition.h"

@import MLKitVision.MLKVisionImage;
@import MLKitTextRecognition;

@implementation TextRecognition

RCT_EXPORT_MODULE()

- (NSDictionary*)frameToDict: (CGRect)frame {
    return @{
        @"width": @(frame.size.width),
        @"height": @(frame.size.height),
        @"top": @(frame.origin.y),
        @"left": @(frame.origin.x)
    };
}

- (NSArray<NSDictionary*>*)langsToDicts: (NSArray<MLKTextRecognizedLanguage*>*)langs {
    NSMutableArray *array = [NSMutableArray array];
    for (MLKTextRecognizedLanguage* lang in langs) {
        [array addObject:@{ @"languageCode": lang.languageCode }];
    }
    return array;
}

- (NSDictionary*)lineToDict: (MLKTextLine*)line {
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    
    [dict setObject:line.text forKey:@"text"];
    [dict setObject:[self frameToDict:line.frame] forKey:@"frame"];
    [dict setObject:[self langsToDicts:line.recognizedLanguages] forKey:@"recognizedLanguages"];
    
    NSMutableArray *elements = [NSMutableArray array];
    for (MLKTextElement* element in line.elements) {
        [elements addObject:@{
            @"text": element.text,
            @"frame": [self frameToDict:element.frame]
        }];
    }
    [dict setObject:elements forKey:@"elements"];
    
    return dict;
}

- (NSDictionary*)blockToDict: (MLKTextBlock*)block {
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    
    [dict setObject:[self frameToDict:block.frame] forKey:@"frame"];
    [dict setObject:block.text forKey:@"text"];
    [dict setObject:[self langsToDicts:block.recognizedLanguages] forKey:@"recognizedLanguages"];
    
    NSMutableArray *lines = [NSMutableArray array];
    for (MLKTextLine* line in block.lines) {
        [lines addObject:[self lineToDict:line]];
    }
    [dict setObject:lines forKey:@"lines"];
    
    return dict;
}

RCT_EXPORT_METHOD(recognize: (nonnull NSString*)url
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSURL *_url = [NSURL URLWithString:url];
    NSData *imageData = [NSData dataWithContentsOfURL:_url];
    UIImage *image = [UIImage imageWithData:imageData];
    MLKVisionImage *visionImage = [[MLKVisionImage alloc] initWithImage:image];
    MLKTextRecognizer *textRecognizer = [MLKTextRecognizer textRecognizer];
    
    [textRecognizer processImage:visionImage
                      completion:^(MLKText *_Nullable _result,
                                   NSError *_Nullable error) {
        if (error != nil || _result == nil) {
            return reject(@"Text Recognition", @"Text recognition failed", error);
        }
        
        NSMutableDictionary *result = [NSMutableDictionary dictionary];
        
        [result setObject:_result.text forKey:@"text"];
        
        NSMutableArray *blocks = [NSMutableArray array];
        for (MLKTextBlock *block in _result.blocks) {
            [blocks addObject:[self blockToDict:block]];
        }
        [result setObject:blocks forKey:@"blocks"];

        resolve(result);
    }];
}

@end
