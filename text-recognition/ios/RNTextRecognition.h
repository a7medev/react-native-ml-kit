// RNTextRecognition.h
// En-tête Objective-C du module iOS.
//
// Stratégie de rétrocompatibilité :
//   - Sans RCT_NEW_ARCH_ENABLED : simple RCTBridgeModule (ancienne archi, Bridge JSON)
//   - Avec RCT_NEW_ARCH_ENABLED : conforme au protocole NativeTextRecognitionSpec (TurboModule)
//
// Le flag RCT_NEW_ARCH_ENABLED est injecté automatiquement par CocoaPods
// quand l'utilisateur installe ses pods avec RCT_NEW_ARCH_ENABLED=1.

#import <React/RCTBridgeModule.h>

// ─── Import du Spec généré par Codegen (New Arch uniquement) ─────────────────
#ifdef RCT_NEW_ARCH_ENABLED
#import <TextRecognitionSpec/TextRecognitionSpec.h>
#endif
// ─────────────────────────────────────────────────────────────────────────────

// Interface principale : toujours RCTBridgeModule (commun aux deux archis)
@interface RNTextRecognition : NSObject <RCTBridgeModule>
@end

// Extension de conformité au Spec Codegen (New Arch uniquement)
// Séparée de l'interface principale pour ne pas polluer la compilation ancienne archi.
#ifdef RCT_NEW_ARCH_ENABLED
@interface RNTextRecognition () <NativeTextRecognitionSpec>
@end
#endif
