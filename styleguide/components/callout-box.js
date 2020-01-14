import { text } from '@storybook/addon-knobs';

const callout = () => {
    const textContent = text('Label', 'some text');
    return `The text is ${textContent}`;
};

export default callout;
