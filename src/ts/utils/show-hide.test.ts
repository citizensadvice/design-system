/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
/* eslint-disable import/no-extraneous-dependencies */

import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import initShowHide from './show-hide';

const selectors = {
  component: '.js-my-component',
  toggle: '.js-my-toggle',
};
const classes = {
  toggleWhenHidden: 'on-this-page__show',
  toggleWhenShowing: 'on-this-page__hide',
  elementIsOpen: 'on-this-page__list--open',
};

const attributes = {
  labelWhenHidden: 'data-label-when-hiding',
  labelWhenShowing: 'data-label-when-showing',
  target: 'data-toggle-target',
};

const showHideHtml = `
<div class="on-this-page ${selectors.component.replace('.', '')}">
    <ul class="on-this-page__list">
        <li class="on-this-page__list-item">
            <button class="${
              classes.toggleWhenHidden
            } cads-linkbutton ${selectors.toggle.replace(
              '.',
              '',
            )} cads-icon_plus" ${
              attributes.labelWhenHidden
            }="Show sub-headings for HEADING_NAME" ${
              attributes.labelWhenShowing
            }="Hide sub-headings for HEADING_NAME" ${
              attributes.target
            }="CHILD_LIST" aria-expanded="false"></button>
            <a href="#h-id">Is the intending visitor a visa national lorem ipsum dolor sit amet</a>
            <ul data-testid="list" class="on-this-page__list on-this-page__list--nested" id="CHILD_LIST">
                <li class="on-this-page__list-item">
                    <a href="#h-id">Child Item 1</a>
                </li>
            </ul>
        </li>
    </ul>
</div>`;

function expectClosed() {
  const toggle = screen.getByRole('button');
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveClass(classes.toggleWhenHidden);
  expect(toggle).toHaveAttribute(
    'aria-label',
    'Show sub-headings for HEADING_NAME',
  );
}

describe('the show / hide module', () => {
  beforeEach(() => {
    document.body.innerHTML = showHideHtml;
    initShowHide(selectors, classes, attributes);
  });

  it('is collapsed on initial render', () => {
    expectClosed();
  });

  it('expands when the toggle is clicked', () => {
    const toggle = screen.getByRole('button');
    toggle.click();

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(toggle).toHaveClass(classes.toggleWhenShowing);
    expect(toggle).toHaveAttribute(
      'aria-label',
      'Hide sub-headings for HEADING_NAME',
    );
  });

  it('collapses after being expanded', () => {
    const toggle = screen.getByRole('button');
    toggle.click();
    toggle.click();
    expectClosed();
  });
});
