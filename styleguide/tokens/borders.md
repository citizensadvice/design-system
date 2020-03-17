# Borders widths & radii

## Widths

<table class="cads-stylebuide__table">
	<tbody>
		<tr>
			<td>$cads-border-width-small</td>
			<td><div class="cads-styleguide__sizing-border-medium" /></td>
			<td>1px</td>
		</tr>
		<tr>
			<td>$cads-border-width-large</td>
			<td><div class="cads-styleguide__sizing-border-large" /></td>
			<td>2px</td>
		</tr>
	</tbody>
</table>

### SASS mixin

The <span class="html inline">border</span> mixin can be used in your custom classes

<span class="html inline">@mixin cads-border($side: a, $width: $cads-border-width-small, $radius: 0, $colour: $cads-language__neutral-mid)</span>

### Parameters

-   **_side_** - for setting border sides using `t`, `r`, `b`, `l`, `v`, `h` or `a` values
-   **_width_** - for setting border width
-   **_radius_** - for setting border radius
-   **_colour_** - for setting border colour

### Mixin usage example

<pre class="html"><code>
.yourClass {
  @include cads-border(
    a,
    $cads-border-width-small,
    $cads-border-radius,
    $cads-language__border-colour
  );
}

// Output
.yourClass {
  border-style: solid;
  border-color: #e5e5e5;
  border-radius: 1px;
  border-width: 1px;
}
</code></pre>

## Radii

The following radii are available:

<table class="cads-stylebuide__table">
	<tbody>
		<tr>
			<td>$cads-border-radius</td>
			<td><div class="cads-styleguide__sizing-radius" /></td>
			<td>1px</td>
		</tr>
	</tbody>
</table>
