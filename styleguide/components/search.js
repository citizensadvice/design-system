import wrapper from './component-wrapper';

const search = () => {
    const component = `<div class="cads-search">
<input type="search" name="q" aria-label="Search through site content" placeholder="Search for something..."><button class="cads-button cads-search-button">Search</button>
</div>`;
    return wrapper(
        'Search',
        component,
        'Make sure there is no space between the <code>input</code> and the <code>button</code> in your markup.'
    );
};

export default search;
