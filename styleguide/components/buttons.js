import { text } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';

const buttons = () => {
    const content = text('Button label', 'This is a button');
    const component = `<h4>Primary button</h4><button>${content}</button>
<h4>Primary button</h4><button class="cads-button">${content}</button>
<h4>Primary button</h4><button class="cads-button cads-button__primary">${content}</button>
<h4>Secondary button</h4><button class="cads-button cads-button__secondary">${content}</button>`;
    return wrapper('Buttons', component);
};

export default buttons;
