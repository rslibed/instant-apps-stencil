import { createStore } from "@stencil/store";
import { LocaleSettingItem, LocaleUIData } from "./interfaces";

interface LanguageSwitcherState {
  uiData: LocaleUIData | null;
  currentLanguage: string | null;
  lastSave: string | null;
  saving: boolean;
  currentLocaleSettingItem: LocaleSettingItem | null;
}

const LanguageSwitcherStore = createStore<LanguageSwitcherState>({
  uiData: null,
  currentLanguage: null,
  lastSave: null,
  saving: false,
  currentLocaleSettingItem: null
});

export const languageSwitcherState = LanguageSwitcherStore.state;
export const onLanguageSwitcherChange = LanguageSwitcherStore.onChange;
export const store = LanguageSwitcherStore;
