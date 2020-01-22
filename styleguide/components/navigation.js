import wrapper from './component-wrapper';

const navigation = () => {
    const component = `<div class="cads-navigation">
    <ul class="cads-list-unordered">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
    </ul>
</div>`;
    return wrapper('Navigation', component);
};

export default navigation;
