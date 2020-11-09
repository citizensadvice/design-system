import wrapper from '../component-wrapper';

const PagingInfo = () => {
  const component = '<h2 class="cads-paging-info">123456 results</h2>';
  return wrapper('PagingInfo', component);
};

export { PagingInfo };
