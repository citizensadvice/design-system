import { addDecorator, addParameters } from '@storybook/html';

addDecorator(
    storyFn => `<div class="cads-styleguide__wrapper">
<div class="cads-styleguide__breakpoint-label"  aria-hidden="true"></div>
<div class="cads-styleguide__language-label" onclick="javascript:styleguideChangeLangugage();" aria-hidden="true"></div>
${storyFn()}
</div>`
);

// Option defaults:
addParameters({
    options: {
        isToolshown: true,
        showPanel: false,
        panelPosition: 'bottom',
        storySort: (a, b) => a[1].id.localeCompare(b[1].id)
    }
});
