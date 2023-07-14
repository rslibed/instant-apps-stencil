import { Component, Prop, h } from "@stencil/core";
import { LocaleSettingItem, LocaleUIData } from "../support/interfaces";
import { languageSwitcherState, store } from "../support/store";

const BASE = "instant-apps-language-switcher-item";

const CSS = {
  section: `${BASE}__section`,
  selected: `${BASE}__section--selected`,
  collapsed: `${BASE}__section--collapsed`,
  topRow: `${BASE}__top-row`,
  labelContainer: `${BASE}__label-container`,
  label: `${BASE}__label`
};

@Component({
  tag: "instant-apps-language-switcher-item",
  styleUrl: "instant-apps-language-switcher-item.scss",
  shadow: true
})
export class InstantAppsLanguageSwitcherItem {
  @Prop()
  fieldName: string;

  render() {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
    const userLocaleData = uiDataItem?.userLocaleData;
    const label = userLocaleData?.label;
    const value = userLocaleData?.value;
    const isSelected = uiDataItem?.selected;

    return (
      <div class={BASE}>
        <div class={`${CSS.section}${isSelected ? ` ${CSS.selected}` : ""}`}>
          <div class={CSS.topRow}>
            <div class={CSS.labelContainer}>
              <calcite-action
                onClick={() => {
                  uiDataItem.expanded = !uiDataItem.expanded;
                  const uiData = {
                    ...languageSwitcherState.uiData,
                    [this.fieldName]: uiDataItem as LocaleSettingItem
                  } as LocaleUIData;
                  store.set("uiData", uiData);
                }}
                icon={uiDataItem?.expanded ? "chevron-down" : "chevron-right"}
                scale="s"
                appearance="transparent"
              />
              <calcite-icon icon="list-button" scale="s" />
              <span class={CSS.label}>{label}</span>
            </div>
            <calcite-button
              icon-start="magnifying-glass-plus"
              appearance="outline"
              round={true}
              scale="s"
            />
          </div>
          {uiDataItem?.expanded ? (
            <calcite-input
              data-field-name={this.fieldName}
              value={value}
              onFocus={(node) => {
                const uiData = { ...languageSwitcherState.uiData } as LocaleUIData;
                const keys = Object.keys(uiData).filter((key) => key !== "locales");
                keys.forEach((key) => ((uiData[key] as LocaleSettingItem).selected = false));
                keys.forEach((key) => {
                  if (key === node.target.getAttribute("data-field-name")) {
                    (uiData[key] as LocaleSettingItem).selected = true;
                  }
                });
                store.set("uiData", uiData);
              }}
            />
          ) : null}
        </div>
        <div class={`${CSS.section}${isSelected ? ` ${CSS.selected}` : ""}`}>
          <div class={CSS.topRow}>
            <div class={CSS.labelContainer}>
              <calcite-action
                onClick={() => {
                  uiDataItem.expanded = !uiDataItem.expanded;
                  const uiData = {
                    ...languageSwitcherState.uiData,
                    [this.fieldName]: uiDataItem as LocaleSettingItem
                  } as LocaleUIData;
                  store.set("uiData", uiData);
                }}
                icon={uiDataItem?.expanded ? "chevron-down" : "chevron-right"}
                scale="s"
                appearance="transparent"
              />
              <calcite-icon icon="list-button" scale="s" />
              <span class={CSS.label}>{label}</span>
            </div>
          </div>
          {uiDataItem?.expanded ? (
            <calcite-input
              data-field-name={this.fieldName}
              onFocus={(node) => {
                const uiData = { ...languageSwitcherState.uiData } as LocaleUIData;
                const keys = Object.keys(uiData).filter((key) => key !== "locales");
                keys.forEach((key) => ((uiData[key] as LocaleSettingItem).selected = false));
                keys.forEach((key) => {
                  if (key === node.target.getAttribute("data-field-name")) {
                    (uiData[key] as LocaleSettingItem).selected = true;
                  }
                });
                store.set("uiData", uiData);
              }}
            >
              <calcite-button slot="action" icon-start="duplicate" appearance="outline-fill" />
            </calcite-input>
          ) : null}
        </div>
      </div>
    );
  }

  getUIDataItem() {
    if (!languageSwitcherState.uiData) return;
    return languageSwitcherState.uiData[this.fieldName];
  }
}
