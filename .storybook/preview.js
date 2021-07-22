import theme from './theme';

import '../styleguide/styles.scss';

// need to polyfill here, otherwise previews don't work (when viewing components discretely).
import './polyfill';

export const parameters = {
  docs: {
    theme: theme,
  },
  options: {
    layout: 'padded',
    isToolshown: true,
    showPanel: true,
    panelPosition: 'bottom',
    storySort: {
      method: 'alphabetical',
      order: [
        'Getting started',
        'Roadmap',
        'Foundations',
        ['Grid'],
        'Components',
      ],
    },
  },
};
