import { text } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';

const callout = () => {
    const heading = text('Heading', 'Callout title');
    const content = text('Content', 'The callout box content');
    const component = `<div class="cads-callout">
  <h1>${heading}</h1>
  ${content}
</div>`;
    return wrapper('Callout', component);
};

export default callout;
