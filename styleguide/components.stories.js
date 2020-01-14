import { withKnobs } from '@storybook/addon-knobs'; // eslint-disable-line

import CalloutBox from './components/callout-box';

export default {
    title: '3 Components',
    decorators: [withKnobs]
};

export const calloutBox = () => CalloutBox();
