import { text } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';

const navigation = () => {
    const content = text('Content', 'Some navigation content');
    const component = `<div class="cads-navigation">
  ${content}
</div>`;
    return wrapper('Navigation', component);
};

export default navigation;
