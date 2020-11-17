import GreedyNav from '../../src/ts/greedy-nav/GreedyNav';
import initHeader from '../../src/js/header';
import initTargetedContent from '../../src/js/targeted-content';
import initCallouts from '../../src/js/callout';
import initTables from '../../src/js/tables';

export function initGlobalJS() {
  initHeader();
  initTargetedContent();
  initCallouts();
  initTables();
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
