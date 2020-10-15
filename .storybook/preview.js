import { addDecorator, addParameters } from '@storybook/html';

addDecorator(
  (storyFn) => `<div class="cads-styleguide__wrapper">${storyFn()}</div>`
);

// Option defaults:
addParameters({
  options: {
    isToolshown: true,
    showPanel: true,
    panelPosition: 'bottom',
    storySort: {
      method: 'alphabetical',
      order: ['Welcome', ['Getting started'], 'Components'],
    },
  },
});

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'I18n locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', title: 'English' },
        { value: 'cy', right: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', title: 'Cymraeg' },
      ],
    },
  },
};
