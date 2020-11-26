/* eslint-env jest */
import { screen, getByRole } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import initTargetedContent from './targeted-content';

const componentHtml = `<div
  class="cads-targeted-content js-cads-targeted-content"
  data-descriptive-label-hide="hide this section"
  data-descriptive-label-show="show this section"
  data-close-label="Close"
  id="targeted-content-123">
  <h2 class="cads-targeted-content__title js-cads-targeted-content__title">
    Targeted content title
  </h2>
  <div
    class="cads-targeted-content__content cads-prose js-cads-targeted-content__content"
    id="targeted-content-123-content">
    <p>Targeted content body</p>
  </div>
</div>`;

test('allow toggling targeted content', () => {
  document.body.innerHTML = componentHtml;
  initTargetedContent();

  const headingEl = screen.getByRole('heading');
  const buttonEl = getByRole(headingEl, 'button');
  const parentEl = headingEl.parentElement;
  expect(parentEl).toHaveClass('cads-targeted-content--toggleable');

  function expectOpen() {
    expect(parentEl).toHaveClass('cads-targeted-content--open');
    expect(buttonEl).toHaveAttribute('aria-expanded', 'true');
  }

  function expectClosed() {
    expect(parentEl).not.toHaveClass('cads-targeted-content--open');
    expect(buttonEl).toHaveAttribute('aria-expanded', 'false');
  }

  expectClosed();

  buttonEl.click();
  expectOpen();

  buttonEl.click();
  expectClosed();

  buttonEl.click();
  expectOpen();

  screen.getByText('Close').click();
  expectClosed();
});
