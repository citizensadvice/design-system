import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line
import { withA11y } from '@storybook/addon-a11y'; // eslint-disable-line

import './styles.scss';

import CalloutBox from './components/callout-box';
import Header from './components/header';
import Footer from './components/footer';
import Logo from './components/logo';
import Navigation from './components/navigation';
import Search from './components/search';
import Buttons from './components/buttons';
import Breadcrumbs from './components/breadcrumbs';
import NoticeBanner from './components/notice-banner';

export default {
    title: '3 Components',
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

export const calloutBox = () => CalloutBox();
export const header = () => Header();
export const navigation = () => Navigation();
export const search = () => Search();

export const footer = () => Footer();
// Allow HTML into the storybook content control
footer.story = { parameters: { knobs: { escapeHTML: false } } };

export const logo = () => Logo();
export const buttons = () => Buttons();
export const breadcrumbs = () => Breadcrumbs();
export const noticeBanner = () => NoticeBanner();
