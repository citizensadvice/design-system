import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line
import { withA11y } from '@storybook/addon-a11y'; // eslint-disable-line

// The styles
import './styles.scss';

// HTML components
import Breadcrumbs from './components/breadcrumbs';
import Buttons from './components/buttons';
import NoticeBanner from './components/notice-banner';

// Storybook section setup
export default {
    title: '3 Markup Components',
    decorators: [withKnobs, withA11y],
    parameters: {
        options: {
            showPanel: true
        },
        a11y: {
            // optional selector which element to inspect
            element: '#a11yComponentToTest',
            // axe-core configurationOptions (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#parameters-1)
            config: {},
            // axe-core optionsParameter (https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter)
            options: {}
        }
    }
};

// export const callout = () => Callout();
// export const navigation = () => Navigation();

export const buttons = () => Buttons();
export const breadcrumbs = () => Breadcrumbs();
export const noticeBanner = () => NoticeBanner();
