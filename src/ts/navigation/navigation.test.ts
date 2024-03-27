/**
 * @jest-environment jsdom
 */
/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { screen, fireEvent } from '@testing-library/dom';
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
  /**
   * These component tests use a minimal navigation fixture to test
   * basic behaviour and initialisation. Full test scenarios are handled
   * in a navigation.cy.js using Cypress
   */
  const componentHtml = `<div class="cads-navigation-full-width-wrapper">
    <nav class="cads-navigation js-cads-greedy-nav">
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
    </nav>
  </div>`;

  document.body.innerHTML = componentHtml;

  initNavigation();
});

test('toggles the menu open', () => {
  const toggleEl = screen.getByTestId('cads-greedy-nav-toggle');

  expect(toggleEl).toHaveTextContent('More');

  fireEvent.keyUp(toggleEl, { key: 'Tab' });

  expect(toggleEl).toHaveTextContent('Close');
  expect(toggleEl).toHaveAttribute('aria-label', 'Close navigation');
});

test('when tabbing backwards through the dropdown menu', () => {
  const toggleEl = screen.getByTestId('cads-greedy-nav-toggle');

  fireEvent.focus(toggleEl);
  fireEvent.blur(toggleEl);

  expect(toggleEl).toHaveTextContent('More');
  expect(toggleEl).toHaveAttribute('aria-label', 'More navigation options');
});

test('opens the dropdown menu', async () => {
  const user = userEvent.setup();

  const toggleEl = screen.getByTestId('cads-greedy-nav-toggle');
  const navDropdown = screen.getByTestId('cads-greedy-nav-dropdown');

  await user.click(toggleEl);

  expect(navDropdown).toHaveAttribute('aria-hidden', 'false');
});

test('closes the dropdown menu', async () => {
  const user = userEvent.setup();

  const toggleEl = screen.getByTestId('cads-greedy-nav-toggle');
  const navDropdown = screen.getByTestId('cads-greedy-nav-dropdown');

  await user.click(toggleEl);
  await user.click(toggleEl);

  expect(navDropdown).toHaveAttribute('aria-hidden', 'true');
});
