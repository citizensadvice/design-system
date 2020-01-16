import { text } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';

const header = () => {
    const content = text('Content', 'Some header content');
    const component = `<header class="cads-header">
  ${content}
</header>`;
    return wrapper('Header', component);
};

export default header;
