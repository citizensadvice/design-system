# Borders widths & radii

## Widths

<table class="cads-stylebuide__table">
	<tbody>
		<tr>
			<td>$cads-border-width-medium</td>
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

The `border` mixin can be used in your custom classes for a more semantic approach

`@mixin cads-border($side: a, $width: $cads-border-width-medium, $radius: 0, $colour: $cads-language__neutral-mid)`

### Parameters

-   **_side_** - for setting border sides using `t`, `r`, `b`, `l`, `v`, `h` or `a` values
-   **_width_** - for setting border width
-   **_radius_** - for setting border radius
-   **_colour_** - for setting border colour

### Mixin usage example

<pre><code class="css">
.my-semantic-class {
  @include cads-border(
    a,
    $cads-border-width-medium,
    $cads-border-radius-small,
    $cads-language__grey
  );
}

// Output
// .my-semantic-class {
//   border-style: solid;
//   border-color: #aaa;
//   border-radius: 2px;
//   border-width: 1px;
// }
</code></pre>

## Radii
