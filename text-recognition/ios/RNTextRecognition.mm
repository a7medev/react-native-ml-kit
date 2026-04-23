// RNTextRecognition.mm
// Implémentation Objective-C++ du module iOS.
// Extension .mm obligatoire : permet de mélanger Objective-C et C++
// (nécessaire pour getTurboModule qui retourne un type C++ std::shared_ptr).
//
// Rétrocompatibilité :
//   Ancienne archi → RCT_EXPORT_METHOD + RCTPromise  (identique à avant)
//   Nouvelle archi → getTurboModule() en plus, garde exactement la même logique

#import "RNTextRecognition.h"

#import <React/RCTUtils.h>
#import <React/RCTLog.h>

// ML Kit
@import MLKitTextRecognition;
@import MLKitTextRecognitionChinese;
@import MLKitTextRecognitionDevanagari;
@import MLKitTextRecognitionJapanese;
@import MLKitTextRecognitionKorean;
@import MLKitVisionKit;

// ─── Import de la couche JSI générée par Codegen (New Arch uniquement) ────────
#ifdef RCT_NEW_ARCH_ENABLED
#import <TextRecognitionSpec/TextRecognitionSpec.h>
#endif
// ─────────────────────────────────────────────────────────────────────────────

@implementation RNTextRecognition

// Exporte le module sous le nom "TextRecognition" (doit correspondre à TurboModuleRegistry.strictGet)
RCT_EXPORT_MODULE(TextRecognition)

// ─── Helpers privés ──────────────────────────────────────────────────────────

- (NSDictionary *)rectToMap:(CGRect)rect {
    return @{
        @"width":  @(rect.size.width),
        @"height": @(rect.size.height),
        @"top":    @(rect.origin.y),
        @"left":   @(rect.origin.x),
    };
}

- (NSArray *)cornerPointsToMap:(NSArray<NSValue *> *)points {
    NSMutableArray *result = [NSMutableArray array];
    for (NSValue *value in points) {
        CGPoint point = [value CGPointValue];
        [result addObject:@{ @"x": @(point.x), @"y": @(point.y) }];
    }
    return result;
}

- (NSArray *)langToMap:(NSString *)lang {
    return @[@{ @"languageCode": lang ?: @"" }];
}

- (NSDictionary *)elementToMap:(MLKTextElement *)element {
    NSMutableDictionary *map = [NSMutableDictionary dictionary];
    map[@"text"] = element.text;
    if (!CGRectIsEmpty(element.frame)) {
        map[@"frame"] = [self rectToMap:element.frame];
    }
    if (element.cornerPoints.count > 0) {
        map[@"cornerPoints"] = [self cornerPointsToMap:element.cornerPoints];
    }
    return map;
}

- (NSDictionary *)lineToMap:(MLKTextLine *)line {
    NSMutableDictionary *map = [NSMutableDictionary dictionary];
    map[@"text"] = line.text;
    if (!CGRectIsEmpty(line.frame)) {
        map[@"frame"] = [self rectToMap:line.frame];
    }
    if (line.cornerPoints.count > 0) {
        map[@"cornerPoints"] = [self cornerPointsToMap:line.cornerPoints];
    }
    map[@"recognizedLanguages"] = [self langToMap:line.recognizedLanguages.firstObject.languageCode ?: @""];
    map[@"confidenceScore"] = @(line.confidence);
    map[@"rotationDegree"]  = @(0); // MLKit iOS n'expose pas l'angle sur MLKTextLine

    NSMutableArray *elements = [NSMutableArray array];
    for (MLKTextElement *el in line.elements) {
        [elements addObject:[self elementToMap:el]];
    }
    map[@"elements"] = elements;
    return map;
}

- (NSDictionary *)blockToMap:(MLKTextBlock *)block {
    NSMutableDictionary *map = [NSMutableDictionary dictionary];
    map[@"text"] = block.text;
    if (!CGRectIsEmpty(block.frame)) {
        map[@"frame"] = [self rectToMap:block.frame];
    }
    if (block.cornerPoints.count > 0) {
        map[@"cornerPoints"] = [self cornerPointsToMap:block.cornerPoints];
    }
    map[@"recognizedLanguages"] = [self langToMap:block.recognizedLanguages.firstObject.languageCode ?: @""];

    NSMutableArray *lines = [NSMutableArray array];
    for (MLKTextLine *line in block.lines) {
        [lines addObject:[self lineToMap:line]];
    }
    map[@"lines"] = lines;
    return map;
}

- (id<MLKCommonTextRecognizerOptions>)recognizerOptionsForScript:(NSString *)script {
    if (!script) return [MLKTextRecognizerOptions new];
    if ([script isEqualToString:@"Chinese"])    return [MLKChineseTextRecognizerOptions new];
    if ([script isEqualToString:@"Devanagari"]) return [MLKDevanagariTextRecognizerOptions new];
    if ([script isEqualToString:@"Japanese"])   return [MLKJapaneseTextRecognizerOptions new];
    if ([script isEqualToString:@"Korean"])     return [MLKKoreanTextRecognizerOptions new];
    return [MLKTextRecognizerOptions new];
}

// ─── Méthode principale ──────────────────────────────────────────────────────
// @ReactMethod est conservé : nécessaire pour l'ancienne archi (Bridge).
// La New Arch l'appelle aussi via le Spec généré — aucun conflit.

RCT_EXPORT_METHOD(recognize:(NSString *)url
                  script:(NSString *)script
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        NSError *error = nil;
        MLKVisionImage *visionImage = [self visionImageFromUrl:url error:&error];

        if (error || !visionImage) {
            reject(@"TEXT_RECOGNITION_FAILED", @"Failed to load image", error);
            return;
        }

        id<MLKCommonTextRecognizerOptions> options = [self recognizerOptionsForScript:script];
        MLKTextRecognizer *recognizer = [MLKTextRecognizer textRecognizerWithOptions:options];

        [recognizer processImage:visionImage
                      completion:^(MLKText *result, NSError *processingError) {
            if (processingError || !result) {
                reject(@"TEXT_RECOGNITION_FAILED", @"Text recognition failed", processingError);
                return;
            }

            NSMutableDictionary *output = [NSMutableDictionary dictionary];
            output[@"text"] = result.text;

            NSMutableArray *blocks = [NSMutableArray array];
            for (MLKTextBlock *block in result.blocks) {
                [blocks addObject:[self blockToMap:block]];
            }
            output[@"blocks"] = blocks;
            resolve(output);
        }];
    });
}

// ─── Chargement de l'image (URL distante ou fichier local) ───────────────────

- (MLKVisionImage *)visionImageFromUrl:(NSString *)url error:(NSError **)error {
    UIImage *image = nil;

    if ([url hasPrefix:@"http://"] || [url hasPrefix:@"https://"]) {
        NSURL *nsUrl = [NSURL URLWithString:url];
        NSData *data = [NSData dataWithContentsOfURL:nsUrl options:0 error:error];
        if (!data) return nil;
        image = [UIImage imageWithData:data];
    } else {
        // Chemin fichier local — supprime le préfixe file:// si présent
        NSString *path = [url stringByReplacingOccurrencesOfString:@"file://" withString:@""];
        image = [UIImage imageWithContentsOfFile:path];
    }

    if (!image) {
        if (error) {
            *error = [NSError errorWithDomain:@"RNTextRecognition"
                                         code:1
                                     userInfo:@{NSLocalizedDescriptionKey: @"Unable to decode image"}];
        }
        return nil;
    }

    return [[MLKVisionImage alloc] initWithImage:image];
}

// ─── Pont JSI vers le TurboModule C++ (New Arch uniquement) ──────────────────
// getTurboModule est la méthode clé qui connecte l'objet ObjC au monde C++/JSI.
// Le type retourné (NativeTextRecognitionSpecJSI) est généré par Codegen.

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeTextRecognitionSpecJSI>(params);
}
#endif

@end
