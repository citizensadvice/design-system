/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
/* eslint-disable import/no-extraneous-dependencies */

import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

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
        <button aria-expanded="false" 
          class="cads-header__search-reveal js-cads-search-reveal cads-icon_search" 
          data-descriptive-label-hide="Close search" 
          data-descriptive-label-show="Open search" 
          data-testid="expand-button" 
          title="Open search"></button>
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
  const controlButtonEl = screen.getByTitle('Open search');

  expect(headerEl).not.toHaveClass('cads-header--show-search');
  expect(controlButtonEl).toHaveAttribute('aria-expanded', 'false');
  expect(controlButtonEl).toHaveClass('cads-icon_search');

  controlButtonEl.click();

  expect(headerEl).toHaveClass('cads-header--show-search');
  expect(controlButtonEl.title).toBe('Close search');
  expect(controlButtonEl).toHaveAttribute('aria-expanded', 'true');
  expect(controlButtonEl).toHaveClass('cads-icon_close');
});

test('only initialises when header is present', () => {
  document.body.innerHTML = '';
  expect(() => initHeader()).not.toThrow();
});
