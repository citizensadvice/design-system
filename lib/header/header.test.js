/**
 * @vitest-environment jsdom
 */
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';

import initHeader from './header';

const searchFormHtml = `<form action='/the/search-action-url' class='cads-search' role='search'>
  <input aria-label='Search through site content' name='q' type='search'>
  <button class='cads-button cads-search__button' title='Submit search query'></button>
</form>`;

const minimalHeaderHtml = `<header class='cads-header' data-testid="header">
  <div class='cads-grid-container'>
    <div class='cads-grid-row'>
      <div class='cads-grid-col-md-5 cads-header__logo-row'>
        <a class='cads-logo' href='root_path'
          title='Citizens Advice homepage'></a>
        <button type="button"
          class="cads-header__search-reveal js-cads-search-reveal"
          data-descriptive-label-hide="Close search"
          data-descriptive-label-show="Open search"
          data-testid="expand-button"
          aria-label="Open search"></button>
      </div>
      <div class='cads-grid-col-md-7 cads-header__search-row'>
        ${searchFormHtml}
      </div>
    </div>
  </div>
</header>`;

test('allow toggling search', () => {
  document.body.innerHTML = minimalHeaderHtml;
  initHeader();

  const headerEl = screen.getByTestId('header');
  const controlButtonEl = screen.getByTestId('expand-button');

  expect(headerEl).not.toHaveClass('cads-header--show-search');
  expect(controlButtonEl).toHaveAttribute('aria-label', 'Open search');
  expect(controlButtonEl).toHaveAttribute('aria-expanded', 'false');

  controlButtonEl.click();

  expect(headerEl).toHaveClass('cads-header--show-search');
  expect(controlButtonEl).toHaveAttribute('aria-label', 'Close search');
  expect(controlButtonEl).toHaveAttribute('aria-expanded', 'true');
});

test('only initialises when header is present', () => {
  document.body.innerHTML = '';
  expect(() => initHeader()).not.toThrow();
});
