import { Component, Host, Prop, h } from "@stencil/core";

import { Element, HostElement, State, Watch } from "@stencil/core/internal";

import { SettingLocaleData } from "./support/interfaces";

import { getLocaleComponentStrings } from "../../utils/locale";

import LanguageSwitcher_t9n from "../../assets/t9n/instant-apps-language-switcher/resources.json";

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
  uiData: SettingLocaleData = {};

  @Prop()
  appSettings;

  @Prop({
    mutable: true
  })
  open = true;

  @State()
  saving = false;

  @State()
  messages: typeof LanguageSwitcher_t9n;

  componentWillLoad() {
    this.getMessages();
    this.generateUIData();
    console.log("UI DATA: ", this.uiData);
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
      <calcite-modal open={this.open} scale="l">
        {this.renderHeader()}
        {this.renderUIData()}
        {this.renderPrimaryButton()}
      </calcite-modal>
    );
  }

  renderPopoverTip(): HTMLCalcitePopoverElement {
    return (
      <calcite-popover reference-element="headerTip" placement="trailing" auto-close={true}>
        {this.messages?.headerTip}
      </calcite-popover>
    );
  }

  renderHeader(): HTMLElement {
    return (
      <header slot="header">
        <span>{`${this.messages?.header} | ${this.messages?.subHeader}`}</span>
        <calcite-button id="headerTip" appearance="transparent">
          <calcite-icon icon="information" scale="s" />
        </calcite-button>
      </header>
    );
  }

  renderUIData(): HTMLDivElement {
    return <div id="content">{Object.keys(this.uiData)?.map(() => this.renderUIDataItem())}</div>;
  }

  renderUIDataItem(): HTMLDivElement {
    return (
      <div>
        <span></span>
      </div>
    );
  }

  renderPrimaryButton(): HTMLCalciteButtonElement {
    return <calcite-button slot="primary">{this.messages?.close}</calcite-button>;
  }

  async getMessages(): Promise<void> {
    const messages = await getLocaleComponentStrings(this.el);
    this.messages = messages[0] as typeof LanguageSwitcher_t9n;
  }

  generateUIData() {
    const settingKeys = Object.keys(this.appSettings);
    const uiData = {};
    settingKeys.forEach((key) => {
      const appSetting = this.appSettings[key];
      console.log(appSetting);
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
    this.uiData = uiData;
  }
}
