export interface IdentifiedLanguage {
  language: string;
  confidence: number;
}

interface IIdentifyLanguages {
  identify: (text: string) => Promise<string>;
  identifyPossible: (text: string) => Promise<IdentifiedLanguage[]>;
}

declare const IdentifyLanguages: IIdentifyLanguages;

export default IdentifyLanguages;
