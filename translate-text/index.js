import { NativeModules } from 'react-native';

const LINKING_ERROR =
  `The package '@react-native-ml-kit/translate-text' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

export const TranslateLanguage = Object.freeze({
  AFRIKAANS: 'af',
  ALBANIAN: 'sq',
  ARABIC: 'ar',
  BELARUSIAN: 'be',
  BULGARIAN: 'bg',
  BENGALI: 'bn',
  CATALAN: 'ca',
  CHINESE: 'zh',
  CROATIAN: 'hr',
  CZECH: 'cs',
  DANISH: 'da',
  DUTCH: 'nl',
  ENGLISH: 'en',
  ESPERANTO: 'eo',
  ESTONIAN: 'et',
  FINNISH: 'fi',
  FRENCH: 'fr',
  GALICIAN: 'gl',
  GEORGIAN: 'ka',
  GERMAN: 'de',
  GREEK: 'el',
  GUJARATI: 'gu',
  HAITIAN_CREOLE: 'ht',
  HEBREW: 'he',
  HINDI: 'hi',
  HUNGARIAN: 'hu',
  ICELANDIC: 'is',
  INDONESIAN: 'id',
  IRISH: 'ga',
  ITALIAN: 'it',
  JAPANESE: 'ja',
  KANNADA: 'kn',
  KOREAN: 'ko',
  LITHUANIAN: 'lt',
  LATVIAN: 'lv',
  MACEDONIAN: 'mk',
  MARATHI: 'mr',
  MALAY: 'ms',
  MALTESE: 'mt',
  NORWEGIAN: 'no',
  PERSIAN: 'fa',
  POLISH: 'pl',
  PORTUGUESE: 'pt',
  ROMANIAN: 'ro',
  RUSSIAN: 'ru',
  SLOVAK: 'sk',
  SLOVENIAN: 'sl',
  SPANISH: 'es',
  SWEDISH: 'sv',
  SWAHILI: 'sw',
  TAGALOG: 'tl',
  TAMIL: 'ta',
  TELUGU: 'te',
  THAI: 'th',
  TURKISH: 'tr',
  UKRAINIAN: 'uk',
  URDU: 'ur',
  VIETNAMESE: 'vi',
  WELSH: 'cy',
});

const TranslateText = NativeModules.TranslateText
  ? NativeModules.TranslateText
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default TranslateText;
