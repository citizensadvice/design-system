/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import path from 'path';
import fs from 'fs';
import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import { showToggle, GreedyNavMenu } from './navigation';

const menuFixture = fs.readFileSync(
  path.join(__dirname, './__fixtures__/menu.html'),
  'utf8',
);

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

describe('Greedy Nav', () => {
  beforeAll(() => {
    window.ResizeObserver = ResizeObserver;
  });

  afterAll(() => {
    delete window.ResizeObserver;
  });

  describe('showToggle', () => {
    test('displays toggle if breaks is empty', () => {
      const selector = '.cads-greedy-nav-dropdown-toggle';
      document.body.innerHTML = `<div class="cads-greedy-nav-dropdown">
        <div class="cads-greedy-nav__wrapper" aria-haspopup="false">
        <button class="cads-greedy-nav-dropdown-toggle cads-greedy-nav-is-visible"></button>
        </div>
      </div>`;

      const wrapper = document.querySelector<HTMLElement>(
        '.cads-greedy-nav-dropdown',
      )!;
      const navWrapper = wrapper.querySelector<HTMLElement>(
        '.cads-greedy-nav__wrapper',
      );
      const toggle = document.querySelector<HTMLElement>(selector)!;

      showToggle(wrapper, selector, []);

      expect(toggle.classList).toContain('cads-greedy-nav-is-hidden');
      expect(toggle.classList).not.toContain('cads-greedy-nav-is-visible');
      expect(navWrapper?.getAttribute('aria-haspopup')).toBe('false');
    });

    test('hides toggle if breaks is populated', () => {
      const selector = '.cads-greedy-nav-dropdown-toggle';
      document.body.innerHTML = `<div class="cads-greedy-nav-dropdown ">
                <div class="cads-greedy-nav__wrapper" aria-haspopup="false">
                <button class="cads-greedy-nav-dropdown-toggle cads-greedy-nav-is-hidden"></button>
                </div></div>`;

      const wrapper = document.querySelector<HTMLElement>(
        '.cads-greedy-nav-dropdown',
      )!;
      const navWrapper = wrapper.querySelector<HTMLElement>(
        '.cads-greedy-nav__wrapper',
      );
      const toggle = document.querySelector<HTMLElement>(selector)!;

      showToggle(wrapper, selector, [1]);

      expect(toggle.classList).not.toContain('cads-greedy-nav-is-hidden');
      expect(toggle.classList).toContain('cads-greedy-nav-is-visible');
      expect(navWrapper?.getAttribute('aria-haspopup')).toBe('true');
    });
  });

  describe('toDropdown', () => {
    test('moves last menu child to dropdown', () => {
      document.body.innerHTML = `<nav>
                <ul class="menu">
                <li>one</li><li>two></li><li>three</li>
                </ul>
                <ul class="cads-greedy-nav__dropdown"></ul></nav>`;

      const nav = document.querySelector<HTMLElement>('nav')!;
      const menu = document.querySelector<HTMLElement>('.menu')!;
      const dropdown = document.querySelector<HTMLElement>(
        '.cads-greedy-nav__dropdown',
      )!;

      const greedyNavMenu = new GreedyNavMenu();

      greedyNavMenu.toDropdown(nav);

      expect(menu.querySelectorAll('li')).toHaveLength(2);
      expect(dropdown.querySelectorAll('li')).toHaveLength(1);
    });

    test('moves menu items to the dop of dropdown', () => {
      document.body.innerHTML = `<nav>
                <ul class="menu">
                <li>one</li><li>two</li>
                </ul>
                <ul class="cads-greedy-nav__dropdown"><li>three</li></ul></nav>`;

      const nav = document.querySelector<HTMLElement>('nav')!;
      const dropdown = document.querySelector<HTMLElement>(
        '.cads-greedy-nav__dropdown',
      )!;

      const greedyNavMenu = new GreedyNavMenu();

      greedyNavMenu.toDropdown(nav);

      expect(dropdown.innerHTML).toBe('<li>two</li><li>three</li>');
    });
  });

  describe('toMenu', () => {
    test('moves items from dropdown to menu', () => {
      document.body.innerHTML = `<nav>
                <ul class="menu">
                <li>one</li>
                </ul>
                <ul class="cads-greedy-nav__dropdown"><li>two></li><li>three</li></ul></nav>`;

      const nav = document.querySelector<HTMLElement>('nav')!;
      const menu = document.querySelector<HTMLElement>('.menu')!;
      const dropdown = document.querySelector<HTMLElement>(
        '.cads-greedy-nav__dropdown',
      )!;

      const greedyNavMenu = new GreedyNavMenu();

      greedyNavMenu.toMenu(nav);

      expect(menu.querySelectorAll('li')).toHaveLength(2);
      expect(dropdown.querySelectorAll('li')).toHaveLength(1);
    });
  });

  describe('listeners', () => {
    let nav: GreedyNavMenu;

    beforeEach(async () => {
      document.body.innerHTML = menuFixture;

      nav = new GreedyNavMenu();
      nav.init(document.querySelector('.js-cads-greedy-nav'));

      // Change the viewport to 300px.
      global.innerWidth = 300;

      // Trigger the window resize event.
      global.dispatchEvent(new Event('resize'));
    });

    test('toggles the menu open', () => {
      fireEvent.keyUp(nav.navDropdownToggle, { key: 'Tab' });

      expect(nav.navDropdown!.className).toContain('show');
      expect(nav.mainNavWrapper!.className).toContain('is-open');
      expect(nav.navDropdownToggle!.innerHTML).toContain('Close');
      expect(nav.navDropdownToggle).toHaveAttribute(
        'aria-label',
        'Close navigation options',
      );
    });

    test('when tabbing backwards through the dropdown menu', () => {
      fireEvent.focus(nav.navDropdownToggle);
      fireEvent.blur(nav.navDropdownToggle);

      expect(nav.navDropdown!.className).not.toContain('show');
      expect(nav.mainNavWrapper!.className).not.toContain('is-open');
      expect(nav.navDropdownToggle!.innerHTML).toContain('More');
      expect(nav.navDropdownToggle).toHaveAttribute(
        'aria-label',
        'More navigation options',
      );
    });
  });

  describe('menu opening and closing', () => {
    let nav: GreedyNavMenu;

    beforeEach(async () => {
      document.body.innerHTML = menuFixture;

      nav = new GreedyNavMenu();
      nav.init(document.querySelector('.js-cads-greedy-nav'));
    });

    test('opens the dropdown menu', async () => {
      const user = userEvent.setup();

      await user.click(nav.navDropdownToggle);

      expect(nav.navDropdown.classList).toContain('show');
      expect(nav.navDropdown!).toHaveAttribute('aria-hidden', 'false');
    });

    test('closes the dropdown menu', async () => {
      const user = userEvent.setup();

      await user.click(nav.navDropdownToggle);
      await user.click(nav.navDropdownToggle);

      expect(nav.navDropdown).not.toContain('show');
      expect(nav.navDropdown).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
