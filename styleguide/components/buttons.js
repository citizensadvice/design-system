import { text } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';

const buttons = () => {
    const content = text('Button label', 'Button');
    const component = `<h4>Primary button</h4><button>Primary button</button>
    <h4>Primary button</h4><button class="cads-button">Primary button</button>
    <h4>Primary button</h4><button class="cads-button cads-button__primary">Primary button</button>
    <h4>Secondary button</h4><button class="cads-button cads-button__secondary">Primary button</button>
</div>`;
    return wrapper('Buttons', component);
};

export default buttons;
