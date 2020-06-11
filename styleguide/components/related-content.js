import wrapper from '../component-wrapper';

const relatedContent = () => {
    const component = `<aside class="related-content">
    <p class="paragraph-s section-title">Related Content</p>
    <h3>Some related content title</h3>
    <ul>
      <li><a href="#">Link 1</a></li>
      <li><a href="#">Link 2</a></li>
      <li><a href="#">Link 3</a></li>
      <li><a href="#">Link 4</a></li>
      <li><a href="#">Link 5</a></li>
    </ul>
</aside>`;
    return wrapper(
        'Related Content',
        component,
        `Related Content is supplied only as CSS. As a consumer you will need to replacte the above markup,
with your content either within the list element. The content should appear within a 9/3 grid,
ie the related content should be contained in a <code>.cads-grid-col-md-3</code>.`
    );
};

export default relatedContent;
