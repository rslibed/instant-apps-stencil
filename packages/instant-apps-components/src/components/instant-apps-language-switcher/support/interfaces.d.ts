export interface LocaleUIData {
  locales: string[];
  [fieldName: string]: LocaleSettingItem | string[];
}

interface LocaleSettingItem {
  userLocaleData: LocaleData;
  translatedLocaleData: SettingLocaleData;
  expanded: boolean;
  selected: boolean;
}

export interface SettingLocaleData {
  [locale: string]: LocaleData;
}

interface LocaleData {
  type: "string" | "richText";
  label: string;
  value: string;
  uiLocation: string[];
}
