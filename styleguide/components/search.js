import wrapper from './component-wrapper';

const component = `<div class="cads-search">
<input type="search" name="q" aria-label="Search through site content"><button class="cads-button cads-search-button">Search</button>
</div>`;

const search = () => {
    return wrapper(
        'Search',
        component,
        'Make sure there is no space between the <code>input</code> and the <code>button</code> in your markup.'
    );
};

export default search;
export { component as markup };
