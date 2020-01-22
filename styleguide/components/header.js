import wrapper from './component-wrapper';
import { markup as Logo } from './logo';

const header = () => {
    const component = `<header class="cads-header">
<div class="cads-grid-container">
    <div class="cads-grid-row">
        <div class="cads-grid-col-md-6">
            ${Logo}
        </div>
        <div class="cads-grid-col-md-6 cads-align-right">
            <ul class="cads-list-unordered cads-list-unordered__inline">
                <li><a href="javascript:;">Item 1</a</li>
                <li><a href="javascript:;">Item 2</a></li>
            </ul>
            <div class="cads-search">
                <div class="cads-search">
                    <input type="search" name="q" aria-label="Search through site content" placeholder="Search for something..."><button class="cads-button cads-search-button">Search</button>
                </div>
            </div>
        </div>
    </div>
</div>
</header>`;
    return wrapper('Header', component);
};

export default header;
