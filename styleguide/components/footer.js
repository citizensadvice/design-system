import { text } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';

const footer = () => {
    const content = text('Content', 'Some footer content');
    const component = `<footer class="cads-footer">
  ${content}
</footer>`;
    return wrapper('Footer', component);
};

export default footer;
