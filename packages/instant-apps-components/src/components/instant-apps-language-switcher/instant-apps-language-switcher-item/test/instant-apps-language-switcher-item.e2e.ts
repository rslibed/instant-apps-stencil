import { newE2EPage } from '@stencil/core/testing';

describe('instant-apps-language-switcher-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<instant-apps-language-switcher-item></instant-apps-language-switcher-item>');

    const element = await page.find('instant-apps-language-switcher-item');
    expect(element).toHaveClass('hydrated');
  });
});
