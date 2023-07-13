# RNMLKitTextRecognition.podspec

require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "RNMLKitTextRecognition"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = "https://github.com/a7med-mahmoud/react-native-ml-kit"
  # brief license entry:
  s.license      = "MIT"
  # optional - use expanded license entry instead:
  # s.license    = { :type => "MIT", :file => "LICENSE" }
  s.authors      = { "Ahmed Mahmoud" => "a7med.mahmoud2004@gmail.com" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/a7med-mahmoud/react-native-ml-kit.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,c,cc,cpp,m,mm,swift}"
  s.requires_arc = true

  s.dependency "React"
  # To recognize Latin script
  s.dependency 'GoogleMLKit/TextRecognition', '3.2.0'
  # To recognize Chinese script
  s.dependency 'GoogleMLKit/TextRecognitionChinese', '3.2.0'
  # To recognize Devanagari script
  s.dependency 'GoogleMLKit/TextRecognitionDevanagari', '3.2.0'
  # To recognize Japanese script
  s.dependency 'GoogleMLKit/TextRecognitionJapanese', '3.2.0'
  # To recognize Korean script
  s.dependency 'GoogleMLKit/TextRecognitionKorean', '3.2.0'
end

