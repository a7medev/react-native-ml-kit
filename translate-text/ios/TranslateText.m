// TranslateText.m

#import "TranslateText.h"

@import MLKitTranslate;
@import MLKitCommon;


@implementation TranslateText

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(translate:(NSDictionary *)optionsMap 
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *text = [optionsMap objectForKey:@"text"];

    if (text == nil) {
        reject(@"TEXT_TRANSLATE_FAILED", @"Text cannot be null", nil);
        return;
    }

    NSString *sourceLanguage = [optionsMap objectForKey:@"sourceLanguage"];
    NSString *targetLanguage = [optionsMap objectForKey:@"targetLanguage"];

    if (sourceLanguage == nil) {
        reject(@"TEXT_TRANSLATE_FAILED", @"Source language cannot be null", nil);
        return;
    }

    if (targetLanguage == nil) {
        reject(@"TEXT_TRANSLATE_FAILED", @"Target language cannot be null", nil);
        return;
    }

    MLKTranslatorOptions *options = [[MLKTranslatorOptions alloc]
                                     initWithSourceLanguage:sourceLanguage
                                     targetLanguage:targetLanguage];

    MLKTranslator *translator = [MLKTranslator
                                 translatorWithOptions:options];

    bool hasRequireWifi = [optionsMap objectForKey:@"requireWifi"];

    MLKModelDownloadConditions *conditions = [[MLKModelDownloadConditions alloc]
                                              initWithAllowsCellularAccess:!hasRequireWifi
                                              allowsBackgroundDownloading:YES];

    [translator
     downloadModelIfNeededWithConditions:conditions
     completion:^(NSError *_Nullable error) {

        if (error != nil) {
            reject(@"TEXT_TRANSLATE_FAILED", @"Error was found", error);
            return;
        }

        [translator
         translateText:text
         completion:^(NSString *_Nullable translatedText, NSError *_Nullable error)
         {
            if (error != nil || translatedText == nil) {
                reject(@"TEXT_TRANSLATE_FAILED", @"Error was found", error);
                return;
            }

            resolve(translatedText);
        }];
    }];
}

@end
