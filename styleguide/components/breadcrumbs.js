import { number } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';

const breadcrumbs = () => {
    const numberOfItems = number('How many crumbs to show', 4);

    let items = '';
    for (let i = 0; i < numberOfItems; i++) {
        items += `<li><a href="javascript:;" class="cads-breadcrumb">Crumb ${i +
            1}</a></li>`;
    }
    const component = `<div class="cads-breadcrumbs">
    <ul class="cads-list-unordered">
        ${items}
        <li>
            <a href="javascript:;" title="The truncated text is provided in the a tag title">
            This is a very long label that should be trunacted</a>
        </li>
        <li title="The accessible title is in the li title">This is a very long label that should be trunacted</li>
    </ul>
</div>`;
    return wrapper('Breadcrumb', component);
};

export default breadcrumbs;
