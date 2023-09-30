import { NativeModules, Platform } from 'react-native';

export interface IdentifiedLanguage {
  /**
   * The [BCP-47 language code](https://en.wikipedia.org/wiki/IETF_language_tag)
   */
  language: string;
  confidence: number;
}

interface IIdentifyLanguages {
  /**
   * Identify the language of text
   *
   * @returns [BCP-47 language code](https://en.wikipedia.org/wiki/IETF_language_tag) or `und` if language not known
   */
  identify: (text: string) => Promise<string>;

  /**
   * Identify text language possiblities
   *
   * @returns Array of `IdentifiedLanguage`
   */
  identifyPossible: (text: string) => Promise<IdentifiedLanguage[]>;
}

const LINKING_ERROR =
  `The package '@react-native-ml-kit/identify-languages' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const IdentifyLanguage: IIdentifyLanguages = NativeModules.IdentifyLanguages
  ? NativeModules.IdentifyLanguages
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default IdentifyLanguage;
