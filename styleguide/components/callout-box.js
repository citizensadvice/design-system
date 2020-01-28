import { text, select } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';

const callout = () => {
    const heading = text('Heading', 'Callout title');
    const content = text('Content', 'The callout box content');
    const options = {
        Info: 'info',
        Quote: 'quote',
        Important: 'important'
    };
    const boxType = select('Callout type', options, 'quote');

    const component = `<div class="cads-callout cads-callout-${boxType}">
  <h1><span class="cads-callout-label"></span>${heading}</h1>
  ${content}
</div>`;
    return wrapper('Callout', component);
};

export default callout;
