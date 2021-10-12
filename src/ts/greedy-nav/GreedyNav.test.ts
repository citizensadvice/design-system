/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import path from 'path';
import fs from 'fs';

import ResizeObserver from './__mocks__/ResizeObserver';

import {
  getClosest,
  showToggle,
  updateLabel,
  GreedyNavMenu,
} from './GreedyNav';

const menuFixture = fs.readFileSync(
  path.join(__dirname, './__fixtures__/menu.html'),
  'utf8'
);

describe('Greedy Nav', () => {
  beforeAll(() => {
    window.ResizeObserver = ResizeObserver;
  });

  afterAll(() => {
    delete window.ResizeObserver;
  });

  describe('getClosest', () => {
    let top: HTMLElement;
    let middle: HTMLElement;
    let bottom: HTMLElement;

    beforeEach(() => {
      document.body.innerHTML = `
        <div id="top" class="parent top" data-top="top">
          <div id="middle" class="parent middle" data-middle="middle">
            <div id="bottom" class="bottom" data-bottom="bottom"></div>
          </div>
        </div>`;

      top = document.querySelector<HTMLElement>('#top')!;
      middle = document.querySelector<HTMLElement>('#middle')!;
      bottom = document.querySelector<HTMLElement>('#bottom')!;
    });

    it('finds direct ancestor node by id', () => {
      expect(getClosest(bottom, '#middle')).toBe(middle);
    });

    it('finds grandparent node by id', () => {
      expect(getClosest(bottom, '#top')).toBe(top);
    });

    it('finds parent by class', () => {
      expect(getClosest(bottom, '.parent')).toBe(middle);
    });

    it('finds grandparent by class', () => {
      expect(getClosest(bottom, '.top')).toBe(top);
    });

    it('finds parent by attribute', () => {
      expect(getClosest(bottom, '[data-middle]')).toEqual(middle);
    });

    it('finds grandparent by attribute', () => {
      expect(getClosest(bottom, '[data-top]')).toEqual(top);
    });

    it("doesn't find absent id", () => {
      expect(getClosest(bottom, '#no-there')).toBeFalsy();
    });

    it("doesn't find absent class", () => {
      expect(getClosest(bottom, '.not-there')).toBeFalsy();
    });

    it('returns false for absent attribute', () => {
      expect(getClosest(bottom, '[not-there]')).toBeFalsy();
    });
  });

  describe('showToggle', () => {
    it('displays toggle if breaks is empty', () => {
      const selector = '.cads-greedy-nav-dropdown-toggle';

      document.body.innerHTML = `<div class="cads-greedy-nav-dropdown cads-greedy-nav-has-dropdown">
        <div class="cads-greedy-nav__wrapper" aria-haspopup="false">
          <button class="cads-greedy-nav-dropdown-toggle cads-greedy-nav-is-visible"></button>
        </div>
      </div>`;

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

    it('hides toggle if breaks is populated', () => {
      const selector = '.cads-greedy-nav-dropdown-toggle';

      document.body.innerHTML = `<div class="cads-greedy-nav-dropdown">
        <div class="cads-greedy-nav__wrapper" aria-haspopup="false">
        <button class="cads-greedy-nav-dropdown-toggle cads-greedy-nav-is-hidden"></button>
        </div>
      </div>`;

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

    let wrapper: HTMLElement;
    let toggle: HTMLElement;

    beforeEach(() => {
      label = 'Menu';
      activeLabel = 'Close';
      selector = '.toggle';
      document.body.innerHTML =
        '<div class="wrapper"><div class="toggle"></div></div>';

      wrapper = document.querySelector<HTMLElement>('.wrapper')!;
      toggle = document.querySelector<HTMLElement>(selector)!;
    });

    it('updates dropdownToggle to closed state', () => {
      updateLabel(wrapper, label, selector, activeLabel);

      expect(toggle.innerHTML).toEqual('Menu');
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
    });

    it('updates dropdownToggle to open state', () => {
      updateLabel(wrapper, activeLabel, selector, activeLabel);

      expect(toggle.innerHTML).toEqual('Close');
      expect(toggle.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('toDropdown', () => {
    it('moves last menu child to dropdown', () => {
      document.body.innerHTML = `<nav>
        <ul class="menu">
          <li>one</li><li>two></li><li>three</li>
        </ul>
        <ul class="cads-greedy-nav__dropdown"></ul>
      </nav>`;

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

    it('moves menu items to the dop of dropdown', () => {
      document.body.innerHTML = `<nav>
        <ul class="menu">
        <li>one</li><li>two</li>
        </ul>
        <ul class="cads-greedy-nav__dropdown"><li>three</li></ul>
      </nav>`;

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
    it('moves items from dropdown to menu', () => {
      document.body.innerHTML = `<nav>
        <ul class="menu">
        <li>one</li>
        </ul>
        <ul class="cads-greedy-nav__dropdown"><li>two></li><li>three</li></ul>
      </nav>`;

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
    let nav: GreedyNavMenu;

    beforeEach(async () => {
      document.body.innerHTML = menuFixture;

      nav = new GreedyNavMenu();
      nav.init();

      // Change the viewport to 300px.
      global.innerWidth = 300;

      // Trigger the window resize event.
      global.dispatchEvent(new Event('resize'));
    });

    it('toggles the menu open', () => {
      fireEvent.keyUp(nav.navDropdownToggle, { key: 'Tab' });

      expect(nav.navDropdown!.className).toContain('show');
      expect(nav.mainNavWrapper!.className).toContain('is-open');
      expect(nav.navDropdownToggle!.innerHTML).toContain('Close');
    });

    it('when tabbing backwards through the dropdown menu', () => {
      fireEvent.focus(nav.navDropdownToggle);
      fireEvent.blur(nav.navDropdownToggle);

      expect(nav.navDropdown!.className).not.toContain('show');
      expect(nav.mainNavWrapper!.className).not.toContain('is-open');
      expect(nav.navDropdownToggle!.innerHTML).toContain('More');
    });
  });

  describe('menu opening and closing', () => {
    let nav: GreedyNavMenu;

    beforeEach(async () => {
      document.body.innerHTML = menuFixture;
      nav = new GreedyNavMenu();
      nav.init();
    });

    afterEach(() => {
      document.body.innerHTML = '';
    });

    describe('openDropDown', () => {
      it('opens the dropdown menu', () => {
        userEvent.click(nav.navDropdownToggle);

        expect(nav.navDropdown.classList).toContain('show');
      });

      it('sets aria-hidden to false on the drop down', () => {
        nav.openDropDown(nav.mainNavWrapper);

        expect(nav.navDropdown!).toHaveAttribute('aria-hidden', 'false');
      });
    });

    describe('closeDropDown', () => {
      beforeEach(() => {
        userEvent.click(nav.navDropdownToggle);
      });

      it('closes the dropdown menu', () => {
        userEvent.click(nav.navDropdownToggle);

        expect(nav.navDropdown).not.toContain('show');
      });

      it('sets aria-hidden to true on the drop down', () => {
        userEvent.click(nav.navDropdownToggle);

        expect(nav.navDropdown).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });
});
