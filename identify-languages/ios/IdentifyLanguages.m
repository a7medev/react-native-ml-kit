#import "IdentifyLanguages.h"

@import MLKitLanguageID;

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

RCT_EXPORT_METHOD(identifyPossible: (nonnull NSString*)text
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    MLKLanguageIdentification *languageId = [MLKLanguageIdentification languageIdentification];
    
    [languageId identifyPossibleLanguagesForText:text
                                      completion:^(NSArray * _Nonnull identifiedLanguages,
                                                   NSError * _Nullable error) {
        if (error != nil) {
            reject(@"Identify Languages", @"Language identification failed", error);
            return;
        }
        
        NSMutableArray *result = [NSMutableArray array];

        for (MLKIdentifiedLanguage *language in identifiedLanguages) {
            [result addObject:@{
                @"language": language.languageTag,
                @"confidence": @(language.confidence)
            }];
        }

        resolve(result);
    }];
}

@end
