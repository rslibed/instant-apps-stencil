import LanguageSwitcher_t9n from "../../../assets/t9n/instant-apps-language-switcher/resources.json";
import { getLocaleComponentStrings } from "../../../utils/locale";
import { LocaleUIData } from "./interfaces";

// export function getLastSavedDate() {}

// export function getUILocation() {}

// export function copyToClipboard() {}

// export function getTranslatedLabel(locale: string) {}

// export function getTranslatedValue(locale: string, portalItemResourceData: string) {}

// export function getSuggestions() {}

// export function handleSuggestionSelection() {}

export function generateUIData(appSettings): LocaleUIData {
  const settingKeys = Object.keys(appSettings);
  const uiData = {
    locales: ["ar", "es", "vi", "zh-CN"]
  };
  settingKeys.forEach((key) => {
    const appSetting = appSettings[key];
    const { type, label, value, uiLocation } = appSetting;
    uiData[key] = {
      userLocaleData: { type, label, value, uiLocation },
      translatedLocaleData: {
        ar: null,
        es: null,
        vi: null,
        "zh-CN": null
      },
      expanded: true
    };
  });

  return uiData;
}

export async function getMessages(el: HTMLInstantAppsLanguageSwitcherElement): Promise<typeof LanguageSwitcher_t9n> {
  const messages = await getLocaleComponentStrings(el);
  return messages[0] as typeof LanguageSwitcher_t9n;
}
