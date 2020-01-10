import './styles.scss';
import sassPalette from '../scss/base/1-settings/_colour-palette.scss';
import sassLanguage from '../scss/base/1-settings/_colour-language.scss';

export default {
    title: 'Design Tokens'
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
    let result = `<h2 class="cads-styleguide-title">Colour ${type}</h2>`;
    colours.forEach(item => {
        const colour = sass[item];
        result += `<div class="cads-styleguide-colour-tile" style="background: ${colour}">
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

export const typography = () => `<h2 class="cads-styleguide-title">Typography</h2>
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
    return '<h2 class="cads-styleguide-title">Spacing</h2>';
};

export const grid = () => {
    return '<h2 class="cads-styleguide-title">Grid</h2>';
};

export const breakpoints = () => {
    return `<h2 class="cads-styleguide-title">Breakpoints</h2>
<h2>SASS mixins</h2>
<h3>Media breakpoint up</h3>
Targeting screen sizes from minimum breakpoint width

<pre>
@include ds-media-breakpoint-up(xs) { ... }
@include ds-media-breakpoint-up(sm) { ... }
@include ds-media-breakpoint-up(md) { ... }
@include ds-media-breakpoint-up(lg) { ... }
@include ds-media-breakpoint-up(xl) { ... }

// Example usage:
@include ds-media-breakpoint-up(sm) {
	.some-class {
	display: block;
	}
}
</pre>

<h3>Media breakpoint down</h3>
Targeting screen sizes up to maximum breakpoint width
<pre>
@include ds-media-breakpoint-down(sm) { ... }
@include ds-media-breakpoint-down(md) { ... }
@include ds-media-breakpoint-down(lg) { ... }
@include ds-media-breakpoint-down(xl) { ... }

// Example usage:
@include ds-media-breakpoint-down(lg) {
  .some-class {
	display: block;
  }
}
</pre>

<h3>Media breakpoint only</h3>
Targeting a single segment of screen sizes using the minimum and maximum breakpoint widths
<pre>
@include ds-media-breakpoint-only(xs) { ... }
@include ds-media-breakpoint-only(sm) { ... }
@include ds-media-breakpoint-only(md) { ... }
@include ds-media-breakpoint-only(lg) { ... }
@include ds-media-breakpoint-only(xl) { ... }

// Example usage:
@include ds-media-breakpoint-only(md) {
  .some-class {
	display: block;
  }
}
</pre>

<h3>Media breakpoint between</h3>
Targeting screen sizes between multiple breakpoint widths
<pre>
@include ds-media-breakpoint-between(sm, lg) { ... }
@include ds-media-breakpoint-between(md, lg) { ... }
@include ds-media-breakpoint-between(md, xl) { ... }

// Example usage:
@include ds-media-breakpoint-between(md, xl) { ... }
  .some-class {
	display: block;
  }
}
</pre>
`;
};

// export const button = () => {
//     const btn = document.createElement('button');
//     btn.type = 'button';
//     btn.innerText = 'Hello Button';
//     btn.addEventListener('click', e => console.log(e));
//     return btn;
// };
