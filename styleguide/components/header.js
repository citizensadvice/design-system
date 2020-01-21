import wrapper from './component-wrapper';
import { markup as Logo } from './logo';

const header = () => {
    const component = `<header class="cads-header">
<div class="cads-grid-container">
    <div class="cads-grid-row">
        <div class="cads-grid-col">
            ${Logo}
        </div>
        <div class="cads-grid-col cads-align-right">
            <ul class="cads-list-unordered cads-list-unordered__inline">
                <li><a href="javascript:;">Item 1</a</li>
                <li><a href="javascript:;">Item 2</a></li>
            </ul>
            <div class="cads-search">
                &lt;Insert Search Component Here&gt;
            </div>
        </div>
    </div>
</div>
</header>`;
    return wrapper('Header', component);
};

export default header;
