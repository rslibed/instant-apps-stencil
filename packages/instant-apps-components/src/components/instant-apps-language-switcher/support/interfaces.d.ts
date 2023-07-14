export interface SettingLocaleData {
  [fieldName: string]: LocaleData;
}

interface LocaleSettingItem {
  userLocaleData: LocaleData;
  translatedLocaleData: SettingLocaleData;
  expanded: boolean;
}

interface LocaleData {
  type: "string" | "richText";
  label: string;
  value: string;
  uiLocation: string[];
}
