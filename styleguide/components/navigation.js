import { number } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';

const navigation = () => {
    const numberOfItems = number('How many links to show', 9);
    let items = '';
    for (let i = 0; i < numberOfItems; i++) {
        items += `<li><a href="javascript:;" class="cads-nav-link">Item ${i +
            1}</a></li>`;
    }
    const component = `<div class="cads-navigation">
    <ul class="cads-list-unordered">
        ${items}
    </ul>
</div>`;
    return wrapper('Navigation', component);
};

export default navigation;
