import GreedyNav from '../../src/ts/greedy-nav/GreedyNav';
import initHeader from '../../src/ts/header/Header';
import initTargetedContent from '../../src/js/targeted-content';

export function initGlobalJS() {
  initHeader();
  initTargetedContent();
  GreedyNav.init({ breakpoint: 0 });
}

export function pageDecorator(Story) {
  setTimeout(() => initGlobalJS());
  return Story();
}

export const pageParameters = {
  layout: 'fullscreen',
  previewTabs: {
    'storybook/docs/panel': {
      hidden: true,
    },
  },
  options: {
    showPanel: false,
  },
};
