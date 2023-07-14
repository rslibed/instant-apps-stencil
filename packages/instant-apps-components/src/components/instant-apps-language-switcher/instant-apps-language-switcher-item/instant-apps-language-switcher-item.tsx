import { Component, Prop, h } from "@stencil/core";
import { LocaleSettingItem } from "../support/interfaces";

const BASE = "instant-apps-language-switcher-item";

const CSS = {
  section: `${BASE}__section`,
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
  uiDataItem: LocaleSettingItem;

  render() {
    const userLocaleData = this.uiDataItem?.userLocaleData;
    const label = userLocaleData?.label;
    const value = userLocaleData?.value;
    return (
      <div class={BASE}>
        <div class={CSS.section}>
          <div class={CSS.topRow}>
            <div class={CSS.labelContainer}>
              <calcite-action icon="chevron-down" scale="s" appearance="transparent" />
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
          <calcite-input value={value} />
        </div>
        <div class={CSS.section}>
          <div class={CSS.topRow}>
            <div class={CSS.labelContainer}>
              <calcite-action icon="chevron-down" scale="s" appearance="transparent" />
              <calcite-icon icon="list-button" scale="s" />
              <span class={CSS.label}>{label}</span>
            </div>
          </div>
          <calcite-input value={value}>
            <calcite-button slot="action" icon-start="duplicate" appearance="outline-fill" />
          </calcite-input>
        </div>
      </div>
    );
  }
}
