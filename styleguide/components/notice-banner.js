import { text } from '@storybook/addon-knobs'; // eslint-disable-line
import wrapper from './component-wrapper';

const noticeBanner = () => {
    const content = text(
        'Banner content',
        'If you’re a Thomas Cook customer and you’re stuck abroad or want to get your money back, get help from the Civil Aviation Authority.'
    );

    const component = `<div class="cads-notice-banner">
    <h4>Notice</h4>
${content}
</div>`;
    return wrapper('Notice Banner', component);
};

export default noticeBanner;
