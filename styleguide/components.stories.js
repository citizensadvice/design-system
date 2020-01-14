import { withKnobs } from '@storybook/addon-knobs';

import ComponentExample from './components/_component-example.md';
import CalloutBox from './components/callout-box';

export default {
    title: '3 Components',
    decorators: [withKnobs]
};

export const componentExample = () => ComponentExample;
export const calloutBox = () => CalloutBox();
