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
            &lt;Insert Search Component Here&gt;
        </div>
    </div>
</div>
</header>`;
    return wrapper('Header', component);
};

export default header;
