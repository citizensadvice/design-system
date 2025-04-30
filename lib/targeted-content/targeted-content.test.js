/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
/* eslint-disable import/no-extraneous-dependencies */

import { screen, getByRole } from '@testing-library/dom';
import '@testing-library/jest-dom';

import initTargetedContent from './targeted-content';

const componentHtml = `<div
  class="cads-targeted-content js-cads-targeted-content"
  data-descriptive-label-hide="close this section"
  data-descriptive-label-show="show this section"
  data-close-label="Close"
  data-title-text="Targeted content title"
  id="targeted-content-123">
  <h2 class="cads-targeted-content__title js-cads-targeted-content__title">
    <div class="cads-targeted-content__title-text">Targeted content title</div>
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

  expect(headingEl.innerHTML).toMatchSnapshot();
  expectClosed();

  buttonEl.click();
  expect(headingEl.innerHTML).toMatchSnapshot();
  expectOpen();

  buttonEl.click();
  expectClosed();

  screen.getByText('Close').click();
  expectClosed();
});
