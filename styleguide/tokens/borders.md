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

The `border` mixin can be used in your custom classes

`@mixin cads-border($side: a, $width: $cads-border-width-small, $radius: 0, $colour: $cads-language__neutral-mid)`

### Parameters

-   **_side_** - for setting border sides using `t`, `r`, `b`, `l`, `v`, `h` or `a` values
-   **_width_** - for setting border width
-   **_radius_** - for setting border radius
-   **_colour_** - for setting border colour

### Mixin usage example

<pre><code class="css">
.yourClass {
  @include cads-border(
    a,
    $cads-border-width-small,
    $cads-border-radius-medium,
    $cads-language__neutral-mid
  );
}

// Output
.yourClass {
  border-style: solid;
  border-color: #9f9f9f;
  border-radius: 4px;
  border-width: 1px;
}
</code></pre>

## Radii

The following radii are available:

<table class="cads-stylebuide__table">
	<tbody>
		<tr>
			<td>$cads-border-radius-medium</td>
			<td><div class="cads-styleguide__sizing-radius-medium" /></td>
			<td>4px</td>
		</tr>
		<tr>
			<td>$cads-border-radius-large</td>
			<td><div class="cads-styleguide__sizing-radius-large" /></td>
			<td>8px</td>
		</tr>
		<tr>
			<td>$cads-border-radius-pill</td>
			<td><div class="cads-styleguide__sizing-radius-pill" /></td>
			<td>96px</td>
		</tr>
	</tbody>
</table>
