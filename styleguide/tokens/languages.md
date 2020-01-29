# Languages

As we have to support a number of languages, e.g. Scottish Gaelic, a top level language class should be applied to the document (e.g. `<body>` tag or top level `<div>`). This will be used to apply language specific styling and in some instances content updates (for example see the Callout component type label).

* `cads-lang-en`: English, this is optional as the default language is set to English
* `cads-lang-gd`: Scottish Gaelic
* `cads-lang-cy`: Welsh

## Examples

### English

<div class="cads-lang-en">
<div class="cads-callout cads-callout-important">
  <h3><span class="cads-callout-label"></span>English</h3>
  This callout is in English.
  <pre><code>
&lt;div class="cads-lang-en">
    &lt;div class="cads-callout cads-callout-important">
        &lt;h3>&lt;span class="cads-callout-label">&lt;/span>English&lt;/h3>
        This callout is in English.
    &lt;/div>
&lt;/div></code></pre>
</div>
</div>

### Scottish 
<div class="cads-lang-gd">
<div class="cads-callout cads-callout-important">
  <h3><span class="cads-callout-label"></span>Gàidhlig</h3>
  This callout is in Scottish.
  <pre><code>
&lt;div class="cads-lang-gd">
    &lt;div class="cads-callout cads-callout-important">
        &lt;h3>&lt;span class="cads-callout-label">&lt;/span>Gàidhlig&lt;/h3>
        This callout is in Scottish.
    &lt;/div>
&lt;/div></code></pre>
</div>
</div>

### Welsh

<div class="cads-lang-cy">
<div class="cads-callout cads-callout-important">
  <h3><span class="cads-callout-label"></span>Cymraeg</h3>
  This callout is in Welsh.
  <pre><code>
&lt;div class="cads-lang-cy">
    &lt;div class="cads-callout cads-callout-important">
        &lt;h3>&lt;span class="cads-callout-label">&lt;/span>Cymraeg&lt;/h3>
        This callout is in Welsh.
    &lt;/div>
&lt;/div></code></pre>
</div>
</div>
