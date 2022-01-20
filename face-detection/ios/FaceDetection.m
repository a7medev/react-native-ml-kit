#import "FaceDetection.h"

@import MLKitVision.MLKVisionImage;
@import MLKitVision.MLKVisionPoint;
@import MLKitFaceDetection;

@implementation FaceDetection

RCT_EXPORT_MODULE()

- (MLKFaceDetectorOptions*)getOptions: (NSDictionary*)dict {
    MLKFaceDetectorOptions* options = [[MLKFaceDetectorOptions alloc] init];
    if ([dict[@"performanceMode"] isEqual:@"accurate"]) {
        options.performanceMode= MLKFaceDetectorPerformanceModeAccurate;
    }
    if ([dict[@"landmarkMode"] isEqual:@"all"]) {
        options.landmarkMode = MLKFaceDetectorLandmarkModeAll;
    }
    if ([dict[@"contourMode"] isEqual:@"all"]) {
        options.contourMode = MLKFaceDetectorContourModeAll;
    }
    if ([dict[@"classificationMode"] isEqual:@"all"]) {
        options.classificationMode = MLKFaceDetectorClassificationModeAll;
    }
    if ([dict[@"minFaceSize"] doubleValue] > 0
        &&  [dict[@"minFaceSize"] doubleValue] <= 1) {
        options.minFaceSize = [dict[@"minFaceSize"] doubleValue];
    }
    options.trackingEnabled = [dict[@"trackingEnabled"] boolValue];
    return options;
}

- (NSDictionary*)frameToDict: (CGRect)frame {
    return @{
        @"width": @(frame.size.width),
        @"height": @(frame.size.height),
        @"left": @(frame.origin.x),
        @"top": @(frame.origin.y)
    };
}

- (NSDictionary*)pointToDict: (MLKVisionPoint*)point {
    return @{
        @"x": @(point.x),
        @"y": @(point.y),
    };
}

- (NSDictionary*)contourToDict: (MLKFaceContour*)contour {
    NSMutableArray *points = [NSMutableArray array];
    for (MLKVisionPoint *point in contour.points) {
        [points addObject:[self pointToDict:point]];
    }
    return @{ @"points": points };
}

- (NSDictionary*)landmarkToDict: (MLKFaceLandmark*)landmark {
    return @{
        @"position": [self pointToDict: landmark.position]
    };
}

- (NSDictionary*)faceToDict: (MLKFace*)face
                withOptions: (MLKFaceDetectorOptions*)options
{
    NSMutableDictionary* dict = [NSMutableDictionary dictionary];
    [dict setObject:[self frameToDict:face.frame] forKey:@"frame"];
    if (face.hasHeadEulerAngleX) {
        [dict setObject:@(face.headEulerAngleX) forKey:@"rotationX"];
    }
    if (face.hasHeadEulerAngleY) {
        [dict setObject:@(face.headEulerAngleY) forKey:@"rotationY"];
    }
    if (face.hasHeadEulerAngleZ) {
        [dict setObject:@(face.headEulerAngleZ) forKey:@"rotationZ"];
    }
    
    // If landmark detection was enabled (mouth, ears, eyes, cheeks, and nose):
    if (options.landmarkMode == MLKFaceDetectorLandmarkModeAll) {
        NSMutableDictionary *landmarks = [NSMutableDictionary dictionary];

        MLKFaceLandmark *leftEar = [face landmarkOfType:MLKFaceLandmarkTypeLeftEar];
        if (leftEar != nil) {
            [landmarks setObject:[self landmarkToDict:leftEar] forKey:@"leftEar"];
        }
        
        MLKFaceLandmark *rightEar = [face landmarkOfType:MLKFaceLandmarkTypeRightEar];
        if (rightEar != nil) {
            [landmarks setObject:[self landmarkToDict:rightEar] forKey:@"rightEar"];
        }
        
        MLKFaceLandmark *leftEye = [face landmarkOfType:MLKFaceLandmarkTypeLeftEye];
        if (leftEye != nil) {
            [landmarks setObject:[self landmarkToDict:leftEye] forKey:@"leftEye"];
        }
        
        MLKFaceLandmark *rightEye = [face landmarkOfType:MLKFaceLandmarkTypeRightEye];
        if (rightEye != nil) {
            [landmarks setObject:[self landmarkToDict:rightEye] forKey:@"rightEye"];
        }
        
        MLKFaceLandmark *noseBase = [face landmarkOfType:MLKFaceLandmarkTypeNoseBase];
        if (noseBase != nil) {
            [landmarks setObject:[self landmarkToDict:noseBase] forKey:@"noseBase"];
        }
        
        MLKFaceLandmark *leftCheek = [face landmarkOfType:MLKFaceLandmarkTypeLeftCheek];
        if (leftCheek != nil) {
            [landmarks setObject:[self landmarkToDict:leftCheek] forKey:@"leftCheek"];
        }
        
        MLKFaceLandmark *rightCheek = [face landmarkOfType:MLKFaceLandmarkTypeRightCheek];
        if (rightCheek != nil) {
            [landmarks setObject:[self landmarkToDict:rightCheek] forKey:@"rightCheek"];
        }
        
        MLKFaceLandmark *mouthLeft = [face landmarkOfType:MLKFaceLandmarkTypeMouthLeft];
        if (mouthLeft != nil) {
            [landmarks setObject:[self landmarkToDict:mouthLeft] forKey:@"mouthLeft"];
        }
        
        MLKFaceLandmark *mouthRight = [face landmarkOfType:MLKFaceLandmarkTypeMouthRight];
        if (mouthRight != nil) {
            [landmarks setObject:[self landmarkToDict:mouthRight] forKey:@"mouthRight"];
        }
        
        MLKFaceLandmark *mouthBottom = [face landmarkOfType:MLKFaceLandmarkTypeMouthBottom];
        if (mouthBottom != nil) {
            [landmarks setObject:[self landmarkToDict:mouthBottom] forKey:@"mouthBottom"];
        }
        
        [dict setObject:landmarks forKey:@"landmarks"];
    }
    
    // If contour detection was enabled:
    if (options.contourMode == MLKFaceDetectorContourModeAll) {
        NSMutableDictionary *contours = [NSMutableDictionary dictionary];

        MLKFaceContour *faceContour = [face contourOfType:MLKFaceContourTypeFace];
        if (faceContour != nil) {
            [contours setObject:[self contourToDict:faceContour] forKey:@"face"];
        }

        MLKFaceContour *leftEye = [face contourOfType:MLKFaceContourTypeLeftEye];
        if (leftEye != nil) {
            [contours setObject:[self contourToDict:leftEye] forKey:@"leftEye"];
        }
        
        MLKFaceContour *rightEye = [face contourOfType:MLKFaceContourTypeRightEye];
        if (rightEye != nil) {
            [contours setObject:[self contourToDict:rightEye] forKey:@"rightEye"];
        }
        
        MLKFaceContour *leftCheek = [face contourOfType:MLKFaceContourTypeLeftCheek];
        if (leftCheek != nil) {
            [contours setObject:[self contourToDict:leftCheek] forKey:@"leftCheek"];
        }
        
        MLKFaceContour *rightCheek = [face contourOfType:MLKFaceContourTypeRightCheek];
        if (rightCheek != nil) {
            [contours setObject:[self contourToDict:rightCheek] forKey:@"rightCheek"];
        }
        
        MLKFaceContour *noseBottom = [face contourOfType:MLKFaceContourTypeNoseBottom];
        if (noseBottom != nil) {
            [contours setObject:[self contourToDict:noseBottom] forKey:@"noseBottom"];
        }
        
        MLKFaceContour *noseBridge = [face contourOfType:MLKFaceContourTypeNoseBridge];
        if (noseBridge != nil) {
            [contours setObject:[self contourToDict:noseBridge] forKey:@"noseBridge"];
        }
        
        MLKFaceContour *leftEyebrowTop = [face contourOfType:MLKFaceContourTypeLeftEyebrowTop];
        if (leftEyebrowTop != nil) {
            [contours setObject:[self contourToDict:leftEyebrowTop] forKey:@"leftEyebrowTop"];
        }
        
        MLKFaceContour *rightEyebrowTop = [face contourOfType:MLKFaceContourTypeRightEyebrowTop];
        if (rightEyebrowTop != nil) {
            [contours setObject:[self contourToDict:rightEyebrowTop] forKey:@"rightEyebrowTop"];
        }
        
        MLKFaceContour *leftEyebrowBottom = [face contourOfType:MLKFaceContourTypeLeftEyebrowBottom];
        if (leftEyebrowBottom != nil) {
            [contours setObject:[self contourToDict:leftEyebrowBottom] forKey:@"leftEyebrowBottom"];
        }
        
        MLKFaceContour *rightEyebrowBottom = [face contourOfType:MLKFaceContourTypeRightEyebrowBottom];
        if (rightEyebrowBottom != nil) {
            [contours setObject:[self contourToDict:rightEyebrowBottom] forKey:@"rightEyebrowBottom"];
        }

        MLKFaceContour *upperLipTop = [face contourOfType:MLKFaceContourTypeUpperLipTop];
        if (upperLipTop != nil) {
            [contours setObject:[self contourToDict:upperLipTop] forKey:@"upperLipTop"];
        }
        
        MLKFaceContour *lowerLipTop = [face contourOfType:MLKFaceContourTypeLowerLipTop];
        if (lowerLipTop != nil) {
            [contours setObject:[self contourToDict:lowerLipTop] forKey:@"lowerLipTop"];
        }
        
        MLKFaceContour *upperLipBottom = [face contourOfType:MLKFaceContourTypeUpperLipBottom];
        if (upperLipBottom != nil) {
            [contours setObject:[self contourToDict:upperLipBottom] forKey:@"upperLipBottom"];
        }
        
        MLKFaceContour *lowerLipBottom = [face contourOfType:MLKFaceContourTypeLowerLipBottom];
        if (lowerLipBottom != nil) {
            [contours setObject:[self contourToDict:lowerLipBottom] forKey:@"lowerLipBottom"];
        }
        
        [dict setObject:contours forKey:@"contours"];
    }
    
    // If classification was enabled:
    if (face.hasSmilingProbability) {
        [dict setObject:@(face.smilingProbability) forKey:@"smilingProbability"];
    }
    
    if (face.hasLeftEyeOpenProbability) {
        [dict setObject:@(face.leftEyeOpenProbability) forKey:@"leftEyeOpenProbability"];
    }
    
    if (face.hasRightEyeOpenProbability) {
        [dict setObject:@(face.rightEyeOpenProbability) forKey:@"rightEyeOpenProbability"];
    }
    
    // If face tracking was enabled:
    if (face.hasTrackingID) {
        [dict setObject:@(face.trackingID) forKey:@"trackingID"];
    }
    return dict;
}

RCT_EXPORT_METHOD(detect: (nonnull NSString*)url
                  withOptions: (NSDictionary*)optionsDict
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSURL *_url = [NSURL URLWithString:url];
    NSData *imageData = [NSData dataWithContentsOfURL:_url];
    UIImage *image = [UIImage imageWithData:imageData];
    MLKVisionImage *visionImage = [[MLKVisionImage alloc] initWithImage:image];
    MLKFaceDetectorOptions *options = [self getOptions:optionsDict];
    MLKFaceDetector *faceDetector = [MLKFaceDetector faceDetectorWithOptions:options];
    [faceDetector processImage:visionImage
                    completion:^(NSArray<MLKFace *> *faces,
                                 NSError *error) {
        if (error != nil) {
            reject(@"Face Detection", @"Face detection failed", error);
        }
        
        NSMutableArray* result = [NSMutableArray array];
        for (MLKFace *face in faces) {
            [result addObject:[self faceToDict:face withOptions:options]];
        }
        resolve(result);
    }];
}

@end
