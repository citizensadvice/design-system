import Quickstart from '../README.md';
import Contact from './documentation/contact.md';
import Contributing from '../CONTRIBUTING.md';

export default {
    title: '1: How do I…',
    decorators: [
        storyFn =>
            `<div class="cads-styleguide-max-content-width">${storyFn()}</div>`
    ]
};

export const useThis = () => Quickstart;
export const contribute = () => Contributing;
export const getHelp = () => Contact;
