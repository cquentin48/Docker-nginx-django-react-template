import yaml from "js-yaml";
import fs from "fs";

let instance: Locale | undefined;

const LOCALE_PATH = "/static/locale/";

class Locale {
  private readonly languageCode: string;

  constructor(languageCode: string = "en-US") {
    if (instance !== undefined) {
      throw new Error("You can only have one locale instance!");
    }
    this.languageCode = languageCode;
    instance = new Locale(languageCode);
  }

  /**
   * Returns the unique instance of the locale
   * @returns {Locale} Locale instance
   */
  static getInstance(): Locale {
    if (instance === undefined) {
      instance = new Locale();
    }
    return instance;
  }

  /**
   * Fetch the locale file in order to find the value there
   * @param textId Key in the yaml file
   * @returns
   */
  loadLocaleStringValue(textId: string): string {
    const path = LOCALE_PATH + this.languageCode + ".yaml";
    const doc = yaml.load(fs.readFileSync(path, "utf8")) as object;
    for (const [key, value] of Object.entries(doc)) {
      if (key === textId) {
        return value;
      }
    }
    throw Error("Key not found in the locale file!");
  }
}

export default Locale;
