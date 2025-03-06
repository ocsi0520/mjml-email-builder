import { html } from 'lit';
import { fixture, expect, assert } from '@open-wc/testing';
import { EBRoot } from '../eb-root';

// https://www.npmjs.com/package/@open-wc/testing-helpers

describe(EBRoot.name, () => {
  let element: EBRoot;
  beforeEach(async () => {
    element = await fixture(html`<eb-root></eb-root>`);
  });

  it('renders a header', () => {
    const header = element.shadowRoot!.querySelector('eb-header')!;
    assert.exists(header); // same as expect(header).to.exist
    expect(header).to.exist; // same as assert.exists(header)
  });

  it.skip('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
