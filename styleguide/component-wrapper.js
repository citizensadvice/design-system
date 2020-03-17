import hljs from 'highlight.js'; // eslint-disable-line
import beautify from 'js-beautify'; // eslint-disable-line

const a11yid = 'a11yComponentToTest';
const wrapper = (title, component, usage, js) => {
    const source = hljs.highlightAuto(
        beautify.html_beautify(component, {
            indent_size: 2
        })
    ).value;

    if (js) {
        setTimeout(js);
    }

    return `
<h1 aria-hidden="true">${title}</h1>
<div id="${a11yid}">
${component}
</div>
<hr />
<div class="cads-max-content-width">
<h2 aria-hidden="true">Code example</h2>
<pre aria-hidden="true"><code class="html">
${source}
</code></pre>
${usage ? `<hr /><h2>Usage info</h2>${usage}` : ''}</div>

`;
};

export default wrapper;
