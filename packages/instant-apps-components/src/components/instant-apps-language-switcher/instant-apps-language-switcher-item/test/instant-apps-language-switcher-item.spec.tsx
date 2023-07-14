import { newSpecPage } from '@stencil/core/testing';
import { InstantAppsLanguageSwitcherItem } from '../instant-apps-language-switcher-item';

describe('instant-apps-language-switcher-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InstantAppsLanguageSwitcherItem],
      html: `<instant-apps-language-switcher-item></instant-apps-language-switcher-item>`,
    });
    expect(page.root).toEqualHtml(`
      <instant-apps-language-switcher-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </instant-apps-language-switcher-item>
    `);
  });
});
