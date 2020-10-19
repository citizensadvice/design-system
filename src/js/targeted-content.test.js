/* eslint-env jest */
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import initTargetedContent from './targeted-content';

const componentHtml = `<details class='cads-targeted-content' id='target-content-123' data-testid="targeted-content">
  <summary aria-controls='target-content-123-content' aria-expanded='false'
    class='cads-targeted-content__summary' role='button'>
    <span class='cads-target-content__button cads-icon_minus'></span>
    <span class='cads-target-content__button cads-icon_plus'></span>
    <span class='cads-targeted-content__title'>
      Summary title
    </span>
  </summary>
  <div class='cads-targeted-content__content' id='target-content-123-content'>
    Details content
    <button aria-label='Collapse'
      class='cads-linkbutton cads-targeted-content__close-button'></button>
  </div>
</details>`;

test('allow toggling targeted content', () => {
  document.body.innerHTML = componentHtml;
  initTargetedContent();

  const detailsEl = screen.getByTestId('targeted-content');
  const summaryEl = screen.getByText('Summary title').parentElement;

  function expectOpen() {
    expect(detailsEl).toHaveClass('is-open');
    expect(summaryEl).toHaveAttribute('aria-expanded', 'true');
  }

  function expectClosed() {
    expect(detailsEl).not.toHaveClass('is-open');
    expect(summaryEl).toHaveAttribute('aria-expanded', 'false');
  }

  expectClosed();

  summaryEl.click();
  expectOpen();

  summaryEl.click();
  expectClosed();

  summaryEl.click();
  expectOpen();

  screen.getByLabelText('Collapse').click();
  expectClosed();
});
