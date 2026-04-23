# text-recognition.podspec
# Podspec de la librairie — gère les deux architectures via le flag RCT_NEW_ARCH_ENABLED.
#
# Installation ancienne archi :  pod install
# Installation nouvelle archi :  RCT_NEW_ARCH_ENABLED=1 pod install

require "json"
package = JSON.parse(File.read(File.join(__dir__, "package.json")))

# Flags Folly requis par la New Architecture (C++ / JSI)
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  s.name         = "RNMLKitTextRecognition"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.author       = package["author"]
  s.platforms    = { :ios => "13.0" }  # ML Kit iOS >= 13
  s.source       = { :git => package["repository"], :tag => "#{s.version}" }

  # Tous les fichiers iOS : header + implémentation ObjC++
  s.source_files = "ios/**/*.{h,m,mm}"

  # Dépendance React Native (commune aux deux archis)
  s.dependency "React-Core"

  # ML Kit (identique ancienne et nouvelle archi — c'est la logique métier)
  s.dependency "GoogleMLKit/TextRecognition"
  s.dependency "GoogleMLKit/TextRecognitionChinese"
  s.dependency "GoogleMLKit/TextRecognitionDevanagari"
  s.dependency "GoogleMLKit/TextRecognitionJapanese"
  s.dependency "GoogleMLKit/TextRecognitionKorean"

  # ─── Dépendances New Architecture uniquement ─────────────────────────────
  # Ce bloc est ignoré lors d'un pod install sans le flag.
  # Il active :
  #   - Le Codegen (génère NativeTextRecognitionSpec.h à partir du fichier .ts)
  #   - Les dépendances C++/JSI nécessaires à getTurboModule()
  if ENV['RCT_NEW_ARCH_ENABLED'] == '1' then
    s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
    s.pod_target_xcconfig = {
      "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
      "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
    }
    s.dependency "React-Codegen"   # Génère NativeTextRecognitionSpecJSI
    s.dependency "RCT-Folly"       # Bibliothèque C++ de Meta (JSI en dépend)
    s.dependency "RCTRequired"
    s.dependency "RCTTypeSafety"
    s.dependency "ReactCommon/turbomodule/core"  # Infrastructure TurboModule
  end
  # ─────────────────────────────────────────────────────────────────────────
end
