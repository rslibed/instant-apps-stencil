import { Component, Prop, h } from "@stencil/core";
import { LocaleSettingItem, LocaleUIData } from "../support/interfaces";
import { languageSwitcherState, store } from "../support/store";
import { getUIDataKeys } from "../support/utils";

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
    return (
      <div class={BASE}>
        {this.renderUserLocaleSection()}
        {this.renderTranslatedLanguageSection()}
      </div>
    );
  }

  renderUserLocaleSection(): HTMLDivElement {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
    const userLocaleData = uiDataItem?.userLocaleData;
    const label = userLocaleData?.label;
    const value = userLocaleData?.value;
    const isSelected = uiDataItem?.selected;
    return (
      <div class={`${CSS.section}${isSelected ? ` ${CSS.selected}` : ""}`}>
        <div class={CSS.topRow}>
          <div class={CSS.labelContainer}>
            {this.renderExpandCollapseButton()}
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
            onFocus={this.handleSelection}
          />
        ) : null}
      </div>
    );
  }

  renderTranslatedLanguageSection(): HTMLDivElement {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
    const userLocaleData = uiDataItem?.userLocaleData;
    const label = userLocaleData?.label;
    const isSelected = uiDataItem?.selected;
    return (
      <div class={`${CSS.section}${isSelected ? ` ${CSS.selected}` : ""}`}>
        <div class={CSS.topRow}>
          <div class={CSS.labelContainer}>
            {this.renderExpandCollapseButton()}
            <calcite-icon icon="list-button" scale="s" />
            <span class={CSS.label}>{label}</span>
          </div>
        </div>
        {uiDataItem?.expanded ? (
          <calcite-input data-field-name={this.fieldName} onFocus={this.handleSelection}>
            <calcite-button slot="action" icon-start="duplicate" appearance="outline-fill" />
          </calcite-input>
        ) : null}
      </div>
    );
  }

  renderExpandCollapseButton(): HTMLCalciteActionElement {
    const uiDataItem = this.getUIDataItem() as LocaleSettingItem;
    return (
      <calcite-action
        onClick={this.handleExpand.bind(this, uiDataItem)}
        icon={uiDataItem?.expanded ? "chevron-down" : "chevron-right"}
        scale="s"
        appearance="transparent"
      />
    );
  }

  getUIDataItem(): LocaleSettingItem | undefined {
    if (!languageSwitcherState.uiData) return;
    return languageSwitcherState.uiData[this.fieldName] as LocaleSettingItem;
  }

  handleExpand(uiDataItem: LocaleSettingItem): void {
    uiDataItem.expanded = !uiDataItem.expanded;
    const uiData = {
      ...languageSwitcherState.uiData,
      [this.fieldName]: uiDataItem as LocaleSettingItem
    } as LocaleUIData;
    store.set("uiData", uiData);
  }

  handleSelection(node: FocusEvent): void {
    const uiData = { ...languageSwitcherState.uiData } as LocaleUIData;
    const uiDataKeys = getUIDataKeys();
    uiDataKeys.forEach((key) => ((uiData[key] as LocaleSettingItem).selected = false));
    uiDataKeys.forEach((key) => {
      if (key === (node?.target as HTMLCalciteInputElement)?.getAttribute("data-field-name")) {
        (uiData[key] as LocaleSettingItem).selected = true;
      }
    });
    store.set("uiData", uiData);
  }
}
