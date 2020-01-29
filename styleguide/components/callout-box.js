import { text, select } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';

const callout = () => {
    const heading = text('Heading', 'Callout title');
    const content = text('Content', 'The callout box content');
    const options = {
        Info: 'info',
        Notice: 'notice',
        Important: 'important'
    };
    const boxType = select('Callout type', options, 'notice');

    const component = `<div class="cads-callout cads-callout-${boxType}">
  <h3><span class="cads-callout-label"></span>${heading}</h3>
  ${content}
</div>`;
    return wrapper('Callout', component);
};

export default callout;
