import wrapper from '../component-wrapper';

const Pagination = () => {
  const component = `<ul class="cads-list-unordered__inline cads-paging">
    <li>
        <button class="cads-paging__button" type="button">
            First
        </button>
    </li>
    <li>
        <button class="cads-paging__button" type="button">
            Previous
        </button>
    </li>
    <li>
        <button class="cads-paging__button" type="button">
            3
        </button>
    </li>
    <li>
        <button class="cads-paging__button" type="button">
            4
        </button>
    </li>
    <li class="cads-paging__current">
        <button class="cads-paging__button" type="button">
            5
        </button>
    </li>
    <li>
        <button class="cads-paging__button" type="button">
            6
        </button>
    </li>
    <li>
        <button class="cads-paging__button" type="button">
            7
        </button>
    </li>
    <li>
        <button class="cads-paging__button" type="button">
            Next
        </button>
    </li>
    <li>
        <button class="cads-paging__button" type="button">
            Last
        </button>
    </li>
</ul>`;
  return wrapper('Pagination', component);
};

const PagingInfo = () => {
  const component = '<h2 class="cads-paging-info">123456 results</h2>';
  return wrapper('PagingInfo', component);
};

export { Pagination, PagingInfo };
