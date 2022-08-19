/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { JSDOM } from 'jsdom';
import path from 'path';

import ResizeObserver from './__mocks__/ResizeObserver';

import { showToggle, updateLabel, GreedyNavMenu } from './GreedyNav';
import { defaultConfig } from './Config';

describe('Greedy Nav', () => {
  beforeAll(() => {
    window.ResizeObserver = ResizeObserver;
  });

  afterAll(() => {
    delete window.ResizeObserver;
  });

  describe('showToggle', () => {
    afterEach(() => {
      document.body.innerHTML = '';
    });

    test('displays toggle if breaks is empty', () => {
      const selector = '.cads-greedy-nav-dropdown-toggle';
      const dom = new JSDOM(
        `<div class="cads-greedy-nav-dropdown cads-greedy-nav-has-dropdown">
                <div class="cads-greedy-nav__wrapper" aria-haspopup="false">
                <button class="cads-greedy-nav-dropdown-toggle cads-greedy-nav-is-visible"></button>
                </div></div>`
      );

      const { document } = dom.window;

      const wrapper = document.querySelector<HTMLElement>(
        '.cads-greedy-nav-dropdown'
      )!;
      const navWrapper = wrapper.querySelector<HTMLElement>(
        '.cads-greedy-nav__wrapper'
      );
      const toggle = document.querySelector<HTMLElement>(selector)!;

      showToggle(wrapper, selector, []);

      expect(toggle.classList).toContain('cads-greedy-nav-is-hidden');
      expect(toggle.classList).not.toContain('cads-greedy-nav-is-visible');
      expect(wrapper.classList).not.toContain('cads-greedy-nav-has-dropdown');
      expect(navWrapper?.getAttribute('aria-haspopup')).toBe('false');
    });

    test('hides toggle if breaks is populated', () => {
      const selector = '.cads-greedy-nav-dropdown-toggle';
      const dom = new JSDOM(
        `<div class="cads-greedy-nav-dropdown ">
                <div class="cads-greedy-nav__wrapper" aria-haspopup="false">
                <button class="cads-greedy-nav-dropdown-toggle cads-greedy-nav-is-hidden"></button>
                </div></div>`
      );

      const { document } = dom.window;

      const wrapper = document.querySelector<HTMLElement>(
        '.cads-greedy-nav-dropdown'
      )!;
      const navWrapper = wrapper.querySelector<HTMLElement>(
        '.cads-greedy-nav__wrapper'
      );
      const toggle = document.querySelector<HTMLElement>(selector)!;

      showToggle(wrapper, selector, [1]);

      expect(toggle.classList).not.toContain('cads-greedy-nav-is-hidden');
      expect(toggle.classList).toContain('cads-greedy-nav-is-visible');
      expect(wrapper.classList).toContain('cads-greedy-nav-has-dropdown');
      expect(navWrapper?.getAttribute('aria-haspopup')).toBe('true');
    });
  });

  describe('updateLabel', () => {
    let label: string;
    let activeLabel: string;
    let selector: string;
    let dom: JSDOM;

    let wrapper: HTMLElement;
    let toggle: HTMLElement;

    beforeEach(() => {
      label = 'Menu';
      activeLabel = 'Close';
      selector = '.toggle';
      dom = new JSDOM('<div class="wrapper"><div class="toggle"></div></div>');

      const { document } = dom.window;

      wrapper = document.querySelector<HTMLElement>('.wrapper')!;
      toggle = document.querySelector<HTMLElement>(selector)!;
    });

    afterEach(() => {
      document.body.innerHTML = '';
    });

    test('updates dropdownToggle to closed state', () => {
      updateLabel(wrapper, label, selector, activeLabel);

      expect(toggle.innerHTML).toEqual('Menu');
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
    });

    test('updates dropdownToggle to open state', () => {
      updateLabel(wrapper, activeLabel, selector, activeLabel);

      expect(toggle.innerHTML).toEqual('Close');
      expect(toggle.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('toDropdown', () => {
    afterEach(() => {
      document.body.innerHTML = '';
    });
    test('moves last menu child to dropdown', () => {
      const dom = new JSDOM(
        `<nav>
                <ul class="menu">
                <li>one</li><li>two></li><li>three</li>
                </ul>
                <ul class="cads-greedy-nav__dropdown"></ul></nav>`
      );

      const { document } = dom.window;

      const nav = document.querySelector<HTMLElement>('nav')!;
      const menu = document.querySelector<HTMLElement>('.menu')!;
      const dropdown = document.querySelector<HTMLElement>(
        '.cads-greedy-nav__dropdown'
      )!;

      const greedyNavMenu = new GreedyNavMenu();

      greedyNavMenu.toDropdown(nav);

      expect(menu.querySelectorAll('li')).toHaveLength(2);
      expect(dropdown.querySelectorAll('li')).toHaveLength(1);
    });

    test('moves menu items to the dop of dropdown', () => {
      const dom = new JSDOM(
        `<nav>
                <ul class="menu">
                <li>one</li><li>two</li>
                </ul>
                <ul class="cads-greedy-nav__dropdown"><li>three</li></ul></nav>`
      );

      const { document } = dom.window;

      const nav = document.querySelector<HTMLElement>('nav')!;
      const dropdown = document.querySelector<HTMLElement>(
        '.cads-greedy-nav__dropdown'
      )!;

      const greedyNavMenu = new GreedyNavMenu();

      greedyNavMenu.toDropdown(nav);

      expect(dropdown.innerHTML).toBe('<li>two</li><li>three</li>');
    });
  });

  describe('toMenu', () => {
    afterEach(() => {
      document.body.innerHTML = '';
    });

    test('moves items from dropdown to menu', () => {
      const dom = new JSDOM(
        `<nav>
                <ul class="menu">
                <li>one</li>
                </ul>
                <ul class="cads-greedy-nav__dropdown"><li>two></li><li>three</li></ul></nav>`
      );

      const { document } = dom.window;

      const nav = document.querySelector<HTMLElement>('nav')!;
      const menu = document.querySelector<HTMLElement>('.menu')!;
      const dropdown = document.querySelector<HTMLElement>(
        '.cads-greedy-nav__dropdown'
      )!;

      const greedyNavMenu = new GreedyNavMenu();

      greedyNavMenu.toMenu(nav);

      expect(menu.querySelectorAll('li')).toHaveLength(2);
      expect(dropdown.querySelectorAll('li')).toHaveLength(1);
    });
  });

  describe('listeners', () => {
    let dom: JSDOM;
    let document: HTMLDocument;
    let nav: GreedyNavMenu;

    beforeEach(async () => {
      dom = await JSDOM.fromFile(
        path.join(__dirname, './__fixtures__/menu.html'),
        { url: 'http://www.example.com/menu.html' }
      );

      document = dom.window.document;

      nav = new GreedyNavMenu(defaultConfig, document);
      nav.init();

      // Change the viewport to 300px.
      global.innerWidth = 300;

      // Trigger the window resize event.
      global.dispatchEvent(new Event('resize'));
    });

    afterEach(() => {
      document.body.innerHTML = '';
    });

    test('toggles the menu open', () => {
      fireEvent.keyUp(nav.navDropdownToggle, { key: 'Tab' });

      expect(nav.navDropdown!.className).toContain('show');
      expect(nav.mainNavWrapper!.className).toContain('is-open');
      expect(nav.navDropdownToggle!.innerHTML).toContain('Close');
      expect(nav.navDropdownToggle).toHaveAttribute(
        'aria-label',
        'Close navigation options'
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
        'More navigation options'
      );
    });
  });

  describe('menu opening and closing', () => {
    let dom: JSDOM;
    let document: HTMLDocument;
    let nav: GreedyNavMenu;

    beforeEach(async () => {
      dom = await JSDOM.fromFile(
        path.join(__dirname, './__fixtures__/menu.html'),
        { url: 'http://www.example.com/menu.html' }
      );

      document = dom.window.document;

      nav = new GreedyNavMenu(defaultConfig, document);
      nav.init();
    });

    afterEach(() => {
      document.body.innerHTML = '';
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
