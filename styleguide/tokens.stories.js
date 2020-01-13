import './styles.scss';
import sassPalette from '../scss/base/1-settings/_colour-palette.scss';
import sassLanguage from '../scss/base/1-settings/_colour-language.scss';

export default {
    title: '2 Design Tokens'
};

function getBrightness(colour) {
    const m = colour
        .substr(1)
        .match(colour.length === 7 ? /(\S{2})/g : /(\S{1})/g);
    let r = 0;
    let g = 0;
    let b = 0;

    if (m) {
        r = parseInt(m[0], 16);
        g = parseInt(m[1], 16);
        b = parseInt(m[2], 16);
    }

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const threshold = 123;

    return brightness < threshold ? '#fff' : '#000';
}

function getColours(type, sass) {
    const colours = Object.keys(sass).filter(
        item => item.indexOf(`${type}-`) !== -1
    );
    let result = `<h2 class="cads-styleguide__title">Colour ${type}</h2>`;
    colours.forEach(item => {
        const colour = sass[item];
        result += `<div class="cads-styleguide__colour-tile" style="background: ${colour}">
<p style="color: ${getBrightness(colour)}">${item.replace(
            /([A-Z])/g,
            g => `-${g[0].toLowerCase()}`
        )}<br/>${colour.toUpperCase()}</p>
</div>`;
    });

    return result;
}

export const colourPalette = () => getColours('palette', sassPalette);

export const colourLanguage = () => getColours('language', sassLanguage);

export const typography = () => `<h2 class="cads-styleguide__title">Typography</h2>
<h1>H1 Citizens Advice helps people find a way</h1>
<h2>H2 Citizens Advice helps people find a way</h2>
<h3>H3 Citizens Advice helps people find a way</h3>
<p>Paragraph text:</p>
<p>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
luctus non mauris et interdum. Etiam non interdum sem, sit amet
interdum risus. Aenean mauris mi, tincidunt at ante sit amet,
facilisis ultricies arcu. Aenean consectetur orci diam, non accumsan
dolor hendrerit ac. Vivamus commodo libero magna, sit amet
ullamcorper ligula egestas non. Nullam et consectetur libero. Sed ut
congue dui. Suspendisse elementum purus at pulvinar rutrum.
Vestibulum ultrices, metus et consectetur hendrerit, tortor urna
iaculis est, ut ullamcorper diam turpis nec lacus. Sed eu lorem
nisl.
</p>
<p>
Nunc nunc dolor, malesuada ut felis vel, mollis auctor turpis.
Curabitur quis diam sed justo cursus ullamcorper. Aenean elementum
tempor neque eu ullamcorper. Cras sit amet vehicula dolor. Aenean
sed tempor neque. Quisque enim risus, faucibus sed fringilla a,
placerat ac ligula. Ut luctus vitae ante eu euismod.
</p>`;

export const spacing = () => {
    return `<h2 class="cads-styleguide__title">Spacing</h2>
<p>Spacing variables can be used directly in your SASS.</p>

<table class="cads-styleguide__table">
<tbody>
<tr>
	<td>$cads-spacing-1</td>
	<td><div class="cads-styleguide__spacing-block cads-styleguide__spacing-block--spacing-1" /></td>
	<td>4px</td>
</tr>
<tr>
	<td>$cads-spacing-2</td>
	<td><div class="cads-styleguide__spacing-block cads-styleguide__spacing-block--spacing-2" /></td>
	<td>8px</td>
</tr>
<tr>
	<td>$cads-spacing-3</td>
	<td><div class="cads-styleguide__spacing-block cads-styleguide__spacing-block--spacing-3" /></td>
	<td>12px</td>
</tr>
<tr>
	<td>$cads-spacing-4</td>
	<td><div class="cads-styleguide__spacing-block cads-styleguide__spacing-block--spacing-4" /></td>
	<td>16px</td>
</tr>
<tr>
	<td>$cads-spacing-5</td>
	<td><div class="cads-styleguide__spacing-block cads-styleguide__spacing-block--spacing-5" /></td>
	<td>24px</td>
</tr>
<tr>
	<td>$cads-spacing-6</td>
	<td><div class="cads-styleguide__spacing-block cads-styleguide__spacing-block--spacing-6" /></td>
	<td>32px</td>
</tr>
<tr>
	<td>$cads-spacing-7</td>
	<td><div class="cads-styleguide__spacing-block cads-styleguide__spacing-block--spacing-7" /></td>
	<td>40px</td>
</tr>
</tbody>
</table>
`;
};

export const grid = () => {
    return '<h2 class="cads-styleguide__title">Grid</h2>';
};

export const breakpoints = () => {
    return `<h2 class="cads-styleguide__title">Breakpoints</h2>
<h2>SASS mixins</h2>
<h3>Media breakpoint up</h3>
Targeting screen sizes from minimum breakpoint width

<pre>
<code class="language-css">
@include cads-media-breakpoint-up(sm) { ... }
@include cads-media-breakpoint-up(md) { ... }
@include cads-media-breakpoint-up(lg) { ... }

// Example usage:
@include cads-media-breakpoint-up(sm) {
  .some-class {
    display: block;
  }
}
</code>
</pre>

<h3>Media breakpoint down</h3>
Targeting screen sizes up to maximum breakpoint width
<pre>
<code class="language-css">
@include cads-media-breakpoint-down(sm) { ... }
@include cads-media-breakpoint-down(md) { ... }
@include cads-media-breakpoint-down(lg) { ... }

// Example usage:
@include cads-media-breakpoint-down(lg) {
  .some-class {
    display: block;
  }
}
</code>
</pre>

<h3>Media breakpoint only</h3>
Targeting a single segment of screen sizes using the minimum and maximum breakpoint widths
<pre>
<code class="language-css">
@include cads-media-breakpoint-only(sm) { ... }
@include cads-media-breakpoint-only(md) { ... }
@include cads-media-breakpoint-only(lg) { ... }

// Example usage:
@include cads-media-breakpoint-only(md) {
  .some-class {
    display: block;
  }
}
</code>
</pre>

<h3>Media breakpoint between</h3>
Targeting screen sizes between multiple breakpoint widths
<pre>
<code class="language-css">
@include cads-media-breakpoint-between(sm, lg) { ... }
@include cads-media-breakpoint-between(md, lg) { ... }

// Example usage:
@include cads-media-breakpoint-between(md, lg) { ... }
  .some-class {
    display: block;
  }
}
</code>
</pre>
`;
};
