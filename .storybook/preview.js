import { addDecorator } from '@storybook/html';

addDecorator(
  (storyFn) => `<div class="cads-styleguide__wrapper">${storyFn()}</div>`
);

export const parameters = {
  viewMode: 'docs',
  options: {
    isToolshown: true,
    showPanel: true,
    panelPosition: 'bottom',
    storySort: {
      method: 'alphabetical',
      order: ['Welcome', ['Getting started'], 'Components'],
    },
  },
};
