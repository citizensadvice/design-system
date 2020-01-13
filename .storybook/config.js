import { configure, addDecorator, addParameters } from '@storybook/html';
import theme from './theme';

addDecorator(
    storyFn => `<div class="cads-styleguide__wrapper">
<div class="cads-styleguide__breakpoint-label"></div>
${storyFn()}
</div>`
);

// Option defaults:
addParameters({
    options: {
        storySort: (a, b) => a[1].id.localeCompare(b[1].id),
        theme
    }
});

// automatically import all files ending in *.stories.js
configure(require.context('../styleguide', true, /\.stories\.js$/), module);
