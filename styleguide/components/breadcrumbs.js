import { number, boolean } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';

const breadcrumbs = () => {
    const numberOfItems = number('How many crumbs to show', 4);
    const previousPage = boolean('Only previous page on small', false);

    let items = '';
    for (let i = 0; i < numberOfItems; i++) {
        items += `<li><a href="javascript:;" class="cads-breadcrumb">Crumb ${i +
            1}</a></li>`;
    }

    let classNames = 'cads-breadcrumbs';
    if (previousPage) {
        classNames += ' cads-breadcrumbs__previous-page-only';
    }

    const component = `<div class="${classNames}">
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
