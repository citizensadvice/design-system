/**
 * @jest-environment jsdom
 */
/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import initNavigation from './navigation';

class ResizeObserver {
  /* eslint-disable class-methods-use-this */
  callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  observe(target: Element, options?: ResizeObserverOptions | undefined): null {
    return null;
  }

  unobserve(): null {
    return null;
  }

  disconnect(): null {
    return null;
  }
}

beforeAll(() => {
  window.ResizeObserver = ResizeObserver;
});

afterAll(() => {
  delete window.ResizeObserver;
});

beforeEach(async () => {
  const componentHtml = `<nav class="cads-navigation js-cads-greedy-nav">
    <ul class="cads-navigation__list">
      <li class="cads-navigation__list-item">
        <a class="cads-navigation__link" href="#">Link 1</a>
      </li>
      <li class="cads-navigation__list-item">
        <a class="cads-navigation__link" href="#">Link 2</a>
      </li>
      <li class="cads-navigation__list-item">
        <a class="cads-navigation__link" href="#">Link 3</a>
      </li>
      <li class="cads-navigation__list-item">
        <a class="cads-navigation__link" href="#">Link 4</a>
      </li>
      <li class="cads-navigation__list-item">
        <a class="cads-navigation__link" href="#">Link 5</a>
      </li>
    </ul>
  </nav>`;

  document.body.innerHTML = componentHtml;

  initNavigation();
});

/**
 * These component tests use a minimal navigation fixture to test
 * basic behaviour and initialisation only. Full test scenarios are handled
 * in a navigation.cy.js using Cypress.
 */
test('component initialises', async () => {
  const user = userEvent.setup();

  const navDropdown = screen.getByTestId('cads-greedy-nav-dropdown');

  await user.click(screen.getByRole('button', { name: /More/i }));
  expect(navDropdown).toHaveAttribute('aria-hidden', 'false');

  await user.click(screen.getByRole('button', { name: /Close/i }));
  expect(navDropdown).toHaveAttribute('aria-hidden', 'true');
});
