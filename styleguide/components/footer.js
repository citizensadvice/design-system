import { text } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';
import { markup as Logo } from './logo';

const footer = () => {
    const section1Heading = text('Section 1 heading', 'Advice');
    const section2Heading = text('Section 2 heading', 'Resources and tools');
    const section3Heading = text('Section 3 heading', 'More from us');
    const section4Heading = text('Section 4 heading', 'About Citizens Advice');
    const footerContent = text(
        'Footer content',
        `<p class="paragraph-s">Copyright ©2020 Citizens Advice. All rights reserved.</p>
<p class="paragraph-s">Citizens Advice is an operating name of the National Association of
Citizens Advice Bureaux. Registered charity number 279057. VAT number 726 0202 76. Company
limited by guarantee. Registered number 01436945 England. Registered office: Citizens
Advice, 3rd Floor North, 200 Aldersgate, London, EC1A 4HD</p>`
    );

    const component = `<footer class="cads-footer">
<div class="cads-grid-container">
  <div class="cads-grid-row">
    <div class="cads-grid-col-md-3">
      <h2 class="cads-heading-medium">${section1Heading}</h2>
      <ul>
        <li><a href="javascript:;">Link 1</a></li>
        <li><a href="javascript:;">Link 2</a></li>
        <li><a href="javascript:;">Link 3</a></li>
        <li><a href="javascript:;">Link 4</a></li>
        <li><a href="javascript:;">Link 5</a></li>
      </ul>
    </div>
    <div class="cads-grid-col-md-3">
      <h2 class="cads-heading-medium">${section2Heading}</h2>
      <ul>
        <li><a href="javascript:;">Link 1</a></li>
        <li><a href="javascript:;">Link 2</a></li>
        <li><a href="javascript:;">Link 3</a></li>
        <li><a href="javascript:;">Link 4</a></li>
        <li><a href="javascript:;">Link 5</a></li>
      </ul>
    </div>
    <div class="cads-grid-col-md-3">
      <h2 class="cads-heading-medium">${section3Heading}</h2>
      <ul>
        <li><a href="javascript:;">Link 1</a></li>
        <li><a href="javascript:;">Link 2</a></li>
        <li><a href="javascript:;">Link 3</a></li>
        <li><a href="javascript:;">Link 4</a></li>
        <li><a href="javascript:;">Link 5</a></li>
      </ul>
    </div>
    <div class="cads-grid-col-md-3">
      <h2 class="cads-heading-medium">${section4Heading}</h2>
      <ul>
        <li><a href="javascript:;">Link 1</a></li>
        <li><a href="javascript:;">Link 2</a></li>
        <li><a href="javascript:;">Link 3</a></li>
        <li><a href="javascript:;">Link 4</a></li>
        <li><a href="javascript:;">Link 5</a></li>
      </ul>
    </div>
  </div>
</div>
<div class="cads-footer__company-info">
    ${Logo}
    <div>
        ${footerContent}
    </div>
</div>
</footer>`;
    return wrapper('Footer', component);
};

export default footer;
