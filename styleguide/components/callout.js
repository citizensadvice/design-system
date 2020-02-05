import { text, select } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';

const callout = () => {
    const heading = text('Heading', 'Callout title');
    const content = text(
        'Content',
        'Nunc nunc dolor, malesuada ut felis vel, mollis auctor turpis. Curabitur quis diam sed justo cursus ullamcorper. Aenean elementum tempor neque eu ullamcorper. Cras sit amet vehicula dolor. Aenean sed tempor neque. Quisque enim risus, faucibus sed fringilla a, placerat ac ligula. Ut luctus vitae ante eu euismod.'
    );
    const options = {
        Example: 'example',
        Info: 'info',
        Important: 'important'
    };
    const boxType = select('Callout type', options, 'info');

    const component = `<div class="cads-callout cads-callout-${boxType}">
  <h3><span class="cads-callout-label"></span>${heading}</h3>
  ${content}
</div>`;
    return wrapper('Callout', component);
};

export default callout;
