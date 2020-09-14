import beautify from 'js-beautify'; // eslint-disable-line

const a11yid = 'a11yComponentToTest';
const wrapper = (title, component, usage, js, pageTemplate) => {
  if (js) {
    setTimeout(js);
  }

  if (pageTemplate) {
    return `
<style>.cads-styleguide__wrapper{padding:0}</style>
<div id=${a11yid}>${component}</div>`;
  }

  const source = beautify
    .html_beautify(component, {
      indent_size: 2,
      unescape_strings: true,
      wrap_line_length: 80,
    })
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return `
<h1 aria-hidden="true">${title}</h1>
<div id="${a11yid}">
${component}
</div>
<hr />
<div class="cads-styleguide-max-content-width">
<h2 aria-hidden="true">Code example</h2>
<pre class="html" aria-hidden="true"><code>
${source}
</code></pre>
${usage ? `<hr /><h2>Usage info</h2>${usage}` : ''}</div>

`;
};

export default wrapper;
