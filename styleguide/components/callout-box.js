import { text } from '@storybook/addon-knobs'; // eslint-disable-line
import hljs from 'highlight.js'; // eslint-disable-line

const callout = () => {
    const heading = text('Heading', 'Callout title');
    const content = text('Content', 'The callout box content');
    const component = `<div id="a11yComponentToTest" class="cads-callout">
  <h1>${heading}</h1>
  ${content}
</div>`;
    const source = hljs.highlightAuto(component).value;

    return `
<h1>Callout box</h1>
${component}
<h2>Component source</h2>

<pre><code class="html">
${source}
</code></pre>
`;
};

export default callout;
