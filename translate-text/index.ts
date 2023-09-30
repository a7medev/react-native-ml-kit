import { NativeModules, Platform } from 'react-native';

export enum TranslateLanguage {
  AFRIKAANS = 'af',
  ALBANIAN = 'sq',
  ARABIC = 'ar',
  BELARUSIAN = 'be',
  BULGARIAN = 'bg',
  BENGALI = 'bn',
  CATALAN = 'ca',
  CHINESE = 'zh',
  CROATIAN = 'hr',
  CZECH = 'cs',
  DANISH = 'da',
  DUTCH = 'nl',
  ENGLISH = 'en',
  ESPERANTO = 'eo',
  ESTONIAN = 'et',
  FINNISH = 'fi',
  FRENCH = 'fr',
  GALICIAN = 'gl',
  GEORGIAN = 'ka',
  GERMAN = 'de',
  GREEK = 'el',
  GUJARATI = 'gu',
  HAITIAN_CREOLE = 'ht',
  HEBREW = 'he',
  HINDI = 'hi',
  HUNGARIAN = 'hu',
  ICELANDIC = 'is',
  INDONESIAN = 'id',
  IRISH = 'ga',
  ITALIAN = 'it',
  JAPANESE = 'ja',
  KANNADA = 'kn',
  KOREAN = 'ko',
  LITHUANIAN = 'lt',
  LATVIAN = 'lv',
  MACEDONIAN = 'mk',
  MARATHI = 'mr',
  MALAY = 'ms',
  MALTESE = 'mt',
  NORWEGIAN = 'no',
  PERSIAN = 'fa',
  POLISH = 'pl',
  PORTUGUESE = 'pt',
  ROMANIAN = 'ro',
  RUSSIAN = 'ru',
  SLOVAK = 'sk',
  SLOVENIAN = 'sl',
  SPANISH = 'es',
  SWEDISH = 'sv',
  SWAHILI = 'sw',
  TAGALOG = 'tl',
  TAMIL = 'ta',
  TELUGU = 'te',
  THAI = 'th',
  TURKISH = 'tr',
  UKRAINIAN = 'uk',
  URDU = 'ur',
  VIETNAMESE = 'vi',
  WELSH = 'cy',
}

export interface TranslateTextResult {}

export interface TranslateTextOptions {
  /** Text to translate */
  text: string;

  /** Source language (Language code to translate from) */
  sourceLanguage: TranslateLanguage;

  /** Target language (Language code to translate to) */
  targetLanguage: TranslateLanguage;

  /**
   * Whether or not to download the model if needed
   *
   * @default false
   */
  downloadModelIfNeeded?: boolean;

  /**
   * Whether or not to download model *only using WiFi*
   *
   * @requires `downloadModelIfNeeded` to be `true`
   * @default false
   */
  requireWifi?: boolean;

  /**
   * Whether or not to download model *only while charging*
   *
   * **Note:** _This will only work on Android >= 24_
   *
   * @requires `downloadModelIfNeeded` to be `true`
   * @default false
   */
  requireCharging?: boolean;
}

interface ITranslateText {
  translate: (options: TranslateTextOptions) => Promise<TranslateTextResult>;
}

const LINKING_ERROR =
  `The package '@react-native-ml-kit/translate-text' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const TranslateText: ITranslateText = NativeModules.TranslateText
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
