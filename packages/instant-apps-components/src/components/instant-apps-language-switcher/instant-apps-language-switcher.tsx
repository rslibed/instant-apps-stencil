import { Component, Host, Prop, h } from "@stencil/core";

import { Element, HostElement, State } from "@stencil/core/internal";

import LanguageSwitcher_t9n from "../../assets/t9n/instant-apps-language-switcher/resources.json";
import { generateUIData, getMessages } from "./support/utils";
import { languageSwitcherState, store } from "./support/store";
import { LocaleSettingItem } from "./support/interfaces";

const BASE = "instant-apps-language-switcher";

const CSS = {
  BASE,
  header: `${BASE}__header`,
  headerText: `${BASE}__header-text`,
  savingIndicator: `${BASE}__saving-indicator`,
  closeButton: `${BASE}__close-button`,
  headerTip: `${BASE}__header-tip`,
  topBar: `${BASE}__top-bar`,
  topBarSection: `${BASE}__top-bar-section`,
  minimizeSearchContainer: `${BASE}__minimize-search-container`,
  userLangText: `${BASE}__user-lang-text`
};

@Component({
  tag: "instant-apps-language-switcher",
  styleUrl: "instant-apps-language-switcher.scss",
  shadow: true
})
export class InstantAppsLanguageSwitcher {
  @Element()
  el: HTMLInstantAppsLanguageSwitcherElement;

  @Prop()
  portalItem!: __esri.PortalItem;

  @Prop()
  portalItemResourceId!: string;

  @Prop()
  appSettings;

  @Prop({
    mutable: true
  })
  open = false;

  @State()
  saving = false;

  @State()
  messages: typeof LanguageSwitcher_t9n;

  async componentWillLoad() {
    this.messages = await getMessages(this.el);
    store.set("currentLanguage", "es");
    store.set("uiData", generateUIData(this.appSettings));
  }

  render(): HostElement {
    return (
      <Host>
        {this.renderModal()}
        {this.renderPopoverTip()}
      </Host>
    );
  }

  renderModal(): HTMLCalciteModalElement {
    return (
      <calcite-modal
        open={this.open}
        scale="l"
        fullscreen={true}
        oncalciteModalClose={() => (this.open = false)}
      >
        {this.renderHeader()}
        {this.renderContent()}
        {this.renderPrimaryButton()}
      </calcite-modal>
    );
  }

  renderPopoverTip(): HTMLCalcitePopoverElement {
    return (
      <calcite-popover reference-element="headerTip" placement="trailing" auto-close={true}>
        <div class={CSS.headerTip}>{this.messages?.headerTip}</div>
      </calcite-popover>
    );
  }

  renderHeader(): HTMLElement {
    return (
      <header class={CSS.header} slot="header">
        {this.renderHeaderText()}
        {this.saving ? this.renderSavingIndicator() : null}
      </header>
    );
  }

  renderHeaderText(): HTMLDivElement {
    return (
      <div class={CSS.headerText}>
        <span>{`${this.messages?.header} | ${this.messages?.subHeader}`}</span>
        <calcite-button id="headerTip" appearance="transparent">
          <calcite-icon icon="information" scale="s" />
        </calcite-button>
      </div>
    );
  }

  renderSavingIndicator(): HTMLDivElement {
    const saving_t9n = this.messages?.saving;
    return (
      <div class={CSS.savingIndicator}>
        <calcite-loader label={saving_t9n} inline={true} />
        <span>{saving_t9n}</span>
      </div>
    );
  }

  renderContent() {
    console.log();
    const locales = languageSwitcherState?.uiData?.locales as string[];
    return (
      <div slot="content">
        {this.renderTopBar()}
        {locales?.length > 0 ? this.renderUIData() : this.renderNotice()}
      </div>
    );
  }

  renderTopBar() {
    return (
      <div class={CSS.topBar}>
        <div class={CSS.topBarSection}>
          <div class={CSS.userLangText}>English</div>
          <div class={CSS.minimizeSearchContainer}>
            <div>
              <calcite-button appearance="transparent" icon-start="list-merge">
                Minimize all
              </calcite-button>
            </div>
            <div>
              <calcite-input type="search" placeholder="Search" icon="search" />
            </div>
          </div>
        </div>
        <div class={CSS.topBarSection}>
          <calcite-label layout="inline">
            Tranlated language
            <calcite-select>
              <calcite-option>Arabic</calcite-option>
              <calcite-option selected>Spanish</calcite-option>
              <calcite-option>Vietnamese</calcite-option>
              <calcite-option>Chinese</calcite-option>
            </calcite-select>
          </calcite-label>
        </div>
      </div>
    );
  }

  renderUIData(): HTMLDivElement | undefined {
    if (!languageSwitcherState?.uiData) return;
    const uiDataKeys = Object.keys(languageSwitcherState.uiData).filter((key) => key !== "locales");
    return <div>{uiDataKeys?.map((key) => this.renderUIDataItem(key))}</div>;
  }

  renderNotice(): HTMLCalciteNoticeElement {
    return (
      <calcite-notice open icon="exclamation-mark-triangle" kind="warning">
        <div slot="title">No languages selected</div>
        <div slot="message">Select at least one language to translate.</div>
      </calcite-notice>
    );
  }

  renderUIDataItem(key: string): HTMLDivElement {
    const uiDataItem = languageSwitcherState.uiData?.[key] as LocaleSettingItem;
    return <instant-apps-language-switcher-item uiDataItem={uiDataItem} />;
  }

  renderPrimaryButton(): HTMLCalciteButtonElement {
    return (
      <calcite-button onClick={() => (this.open = false)} slot="primary" class={CSS.closeButton}>
        {this.messages?.close}
      </calcite-button>
    );
  }
}
