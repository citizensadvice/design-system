/* eslint-env jest */
import { screen } from '@testing-library/dom';

import initCallouts from './callout';

const mockCallout = `<div class="cads-callout cads-callout-standard">
  <h3>Callout title</h3>
  <p>Example callout text</p>
</div>`;

test('should convert h3 in callout to a h2 if there is no existing h2', () => {
  document.body.innerHTML = mockCallout;
  initCallouts();
  expect(screen.queryByText('Callout title').nodeName).toBe('H2');
});

test('should retain h3 in callout if there is an existing h2', () => {
  document.body.innerHTML = `<h2>Existing heading level 2</h2>${mockCallout}`;
  initCallouts();
  expect(screen.queryByText('Callout title').nodeName).toBe('H3');
});
