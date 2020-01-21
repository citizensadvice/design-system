import { text } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';

const search = () => {
    const content = text('Content', 'Some search content');
    const component = `<div class="cads-search">
  ${content}
</div>`;
    return wrapper('Search', component);
};

export default search;
