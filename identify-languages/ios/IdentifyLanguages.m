#import "IdentifyLanguages.h"

@import MLKitLanguageID.MLKLanguageIdentification;

@implementation IdentifyLanguages

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(identify: (nonnull NSString*)text
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    MLKLanguageIdentification *languageId = [MLKLanguageIdentification languageIdentification];
    
    [languageId identifyLanguageForText:text
                             completion:^(NSString * _Nullable languageCode,
                                          NSError * _Nullable error) {
        if (error != nil) {
            reject(@"Identify Languages", @"Language identification failed", error);
            return;
        }
        resolve(languageCode);
    }];
}

@end
