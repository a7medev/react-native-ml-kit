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

declare const IdentifyLanguages: IIdentifyLanguages;

export default IdentifyLanguages;
