import hljs from 'highlight.js'; // eslint-disable-line

const a11yid = 'a11yComponentToTest';

const wrapper = (title, component, usage) => {
    const source = hljs.highlightAuto(component).value;

    return `
<h1>${title}</h1>
<div id="${a11yid}">
${component}
</div>
<h2>Component source</h2>

<pre><code class="html">
${source}
</code></pre>

${usage ? `<h2>Usage info</h2>${usage}` : ''}
`;
};

export default wrapper;
