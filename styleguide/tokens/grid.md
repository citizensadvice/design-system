# Grid

## Intro

- Use `.cads-grid-container` as a top level container for a responsive pixel width across all viewports and device sizes.
- Rows are wrappers for columns. Each column has horizontal `padding` (called a gutter) for controlling the space between them. This `padding` is then counteracted on the rows with negative margins. This way, all the content in your columns is visually aligned down the left side.
- In a grid layout, content must be placed within columns and only columns may be immediate children of rows.
- Grid columns without a specified `width` will automatically layout as equal width columns (the grid is flexbox based). E.g. four instances of `.cads-grid-col-md` will each automatically be 25% wide from the medium breakpoint and up.
- Column classes indicate the number of columns you’d like to use out of the possible 12 per row. So, if you want three equal-width columns across, you can use `.cads-grid-col-4`.
- Column `width`s are set in percentages, so they’re always fluid and sized relative to their parent element.
- Columns have horizontal `padding` to create the gutters between individual columns, however, you can remove the `margin` from rows and `padding` from columns with `.no-gutters` on the `.row`.
- To make the grid responsive, there are three grid breakpoints, one for each responsive breakpoint: all breakpoints (small), medium and large.
- Grid breakpoints are based on minimum width media queries, meaning <strong>they apply to that one breakpoint and all those above it</strong> (e.g., `.cads-grid-col-md-4` applies to medium and large but not the first `sm` breakpoint).

<table class="cads-styleguide-table">
  <thead>
    <tr>
      <th></th>
      <th>
        Small<br>
        <small>&lt;766px</small>
      </th>
      <th>
        Medium<br>
        <small>≥767x</small>
      </th>
      <th>
        Large<br>
        <small>≥1024px</small>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Max container width</th>
      <td>None (auto)</td>
      <td>None (auto)</td>
      <td>1200px</td>
    </tr>
    <tr>
      <th scope="row">Class prefix</th>
      <td><code>.cads-grid-col</code> or<br/><code>.cads-grid-col-sm-</code></td>
      <td><code>.cads-grid-col-md-</code></td>
      <td><code>.cads-grid-col-lg-</code></td>
    </tr>
    <tr>
      <th scope="row"># of columns</th>
      <td colspan="5">12</td>
    </tr>
    <tr>
      <th scope="row">Gutter width</th>
      <td>12px</td>
      <td>12px</td>
      <td>16px</td>
    </tr>
  </tbody>
</table>

For grids that are the same from the smallest of devices to the largest, use the `.cads-grid-col` and `.cads-grid-col-*` classes. 
Using a single set of `.cads-grid-col-{breakpoint}-*` classes, you can create a basic grid system that starts out stacked before becoming horizontal with at the specified breakpoint.

## Design/UX guidelines

Max columns for breakpoints as follows
* Small - 6
* Medium - 6
* Large - 12

Developers should adhere to these guidelines when setting up layout for content.

## Examples

The grid includes three tiers of predefined classes for building complex responsive layouts. Customize the size of your columns on small, medium and large devices however you see fit.

### All breakpoints

For grids that are the same from the smallest of devices to the largest, use the `.cads-grid-col` and `.cads-grid-col-*` classes. Specify a numbered class when you need a particularly sized column; otherwise, feel free to stick to `.cads-grid-col`.

<div class="cads-styleguide-grid cads-grid-container">
    <div class="cads-grid-row">
        <div class="cads-grid-col"><span>1</span></div>
        <div class="cads-grid-col"><span>2</span></div>
        <div class="cads-grid-col"><span>3</span></div>
        <div class="cads-grid-col"><span>4</span></div>
        <div class="cads-grid-col"><span>5</span></div>
        <div class="cads-grid-col"><span>6</span></div>
        <div class="cads-grid-col"><span>7</span></div>
        <div class="cads-grid-col"><span>8</span></div>
        <div class="cads-grid-col"><span>9</span></div>
        <div class="cads-grid-col"><span>10</span></div>
        <div class="cads-grid-col"><span>11</span></div>
        <div class="cads-grid-col"><span>12</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-8"><span>1</span></div>
        <div class="cads-grid-col-4"><span>2</span></div>
    </div>
</div>

```html
<div class="cads-grid-container">
	<div class="cads-grid-row">
	    <div class="cads-grid-col"><span>1</span></div>
	    <div class="cads-grid-col"><span>2</span></div>
	    <div class="cads-grid-col"><span>3</span></div>
	    <div class="cads-grid-col"><span>4</span></div>
	    <div class="cads-grid-col"><span>5</span></div>
	    <div class="cads-grid-col"><span>6</span></div>
	    <div class="cads-grid-col"><span>7</span></div>
	    <div class="cads-grid-col"><span>8</span></div>
	    <div class="cads-grid-col"><span>9</span></div>
	    <div class="cads-grid-col"><span>10</span></div>
	    <div class="cads-grid-col"><span>11</span></div>
	    <div class="cads-grid-col"><span>12</span></div>
	</div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-8"><span>1</span></div>
        <div class="cads-grid-col-4"><span>2</span></div>
    </div>
</div>
```

### Remove gutters

Gutters can be removed by adding the `.cads-grid-row--no-gutter` modifier class to the `.cads-grid-row` element.

<div class="cads-styleguide-grid cads-grid-container">
    <div class="cads-grid-row cads-grid-row--no-gutters">
        <div class="cads-grid-col"><span>1</span></div>
        <div class="cads-grid-col"><span>2</span></div>
        <div class="cads-grid-col"><span>3</span></div>
        <div class="cads-grid-col"><span>4</span></div>
        <div class="cads-grid-col"><span>5</span></div>
        <div class="cads-grid-col"><span>6</span></div>
    </div>
    <div class="cads-grid-row cads-grid-row--no-gutters">
        <div class="cads-grid-col"><span>1</span></div>
        <div class="cads-grid-col"><span>2</span></div>
        <div class="cads-grid-col"><span>3</span></div>
    </div>
</div>

```html
<div class="cads-grid-container">
    <div class="cads-grid-row cads-grid-row--no-gutters">
        <div class="cads-grid-col"><span>1</span></div>
        <div class="cads-grid-col"><span>2</span></div>
        <div class="cads-grid-col"><span>3</span></div>
        <div class="cads-grid-col"><span>4</span></div>
        <div class="cads-grid-col"><span>5</span></div>
        <div class="cads-grid-col"><span>6</span></div>
    </div>
    <div class="cads-grid-row cads-grid-row--no-gutters">
        <div class="cads-grid-col"><span>1</span></div>
        <div class="cads-grid-col"><span>2</span></div>
        <div class="cads-grid-col"><span>3</span></div>
    </div>
</div>
```

### Stacked to horizontal

Using a single set of `.cads-grid-col-lg-*` classes, you can create a basic grid system that starts out stacked before becoming horizontal at the large breakpoint (lg).

<div class="cads-styleguide-grid cads-grid-container">
    <div class="cads-grid-row">
        <div class="cads-grid-col-lg-6"><span>1</span></div>
        <div class="cads-grid-col-lg-6"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-lg-4"><span>1</span></div>
        <div class="cads-grid-col-lg-4"><span>2</span></div>
        <div class="cads-grid-col-lg-4"><span>3</span></div>
    </div>
</div>

```html
<div class="cads-grid-container">
    <div class="cads-grid-row">
        <div class="cads-grid-col-lg-6"><span>1</span></div>
        <div class="cads-grid-col-lg-6"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-lg-4"><span>1</span></div>
        <div class="cads-grid-col-lg-4"><span>2</span></div>
        <div class="cads-grid-col-lg-4"><span>3</span></div>
    </div>
</div>
```


### Mixing column widths

<div class="cads-styleguide-grid cads-grid-container">
    <div class="cads-grid-row">
        <div class="cads-grid-col-1"><span>1</span></div>
        <div class="cads-grid-col-11"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-2"><span>1</span></div>
        <div class="cads-grid-col-10"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-3"><span>1</span></div>
        <div class="cads-grid-col-9"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-4"><span>1</span></div>
        <div class="cads-grid-col-8"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-5"><span>1</span></div>
        <div class="cads-grid-col-7"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-6"><span>1</span></div>
        <div class="cads-grid-col-6"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-7"><span>1</span></div>
        <div class="cads-grid-col-5"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-8"><span>1</span></div>
        <div class="cads-grid-col-4"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-9"><span>1</span></div>
        <div class="cads-grid-col-3"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-10"><span>1</span></div>
        <div class="cads-grid-col-2"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-11"><span>1</span></div>
        <div class="cads-grid-col-1"><span>2</span></div>
    </div>
</div>

```html
<div class="cads-grid-container">
    <div class="cads-grid-row">
        <div class="cads-grid-col-1"><span>1</span></div>
        <div class="cads-grid-col-11"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-2"><span>1</span></div>
        <div class="cads-grid-col-10"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-3"><span>1</span></div>
        <div class="cads-grid-col-9"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-4"><span>1</span></div>
        <div class="cads-grid-col-8"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-5"><span>1</span></div>
        <div class="cads-grid-col-7"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-6"><span>1</span></div>
        <div class="cads-grid-col-6"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-7"><span>1</span></div>
        <div class="cads-grid-col-5"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-8"><span>1</span></div>
        <div class="cads-grid-col-4"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-9"><span>1</span></div>
        <div class="cads-grid-col-3"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-10"><span>1</span></div>
        <div class="cads-grid-col-2"><span>2</span></div>
    </div>
    <div class="cads-grid-row">
        <div class="cads-grid-col-11"><span>1</span></div>
        <div class="cads-grid-col-1"><span>2</span></div>
    </div>
</div>
```

### Responsive varying columns

Use a combination of breakpoint width classes to create different layouts for each breakpoint.  
- Small breakpoint - 1 column (as each cell is 6 columns wide)
- Medium breakpoint - 4 columns (as each cell is 3 columns wide and there are 12 to be wrapped in 4 rows)
- Large breakpoint - 2, 4, 6 columns with wrapping

<div class="cads-styleguide-grid cads-grid-container">
    <div class="cads-grid-row">
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-6"><span>1</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-6"><span>2</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-3"><span>3</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-3"><span>4</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-3"><span>5</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-3"><span>6</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-2"><span>7</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-2"><span>8</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-2"><span>9</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-2"><span>10</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-2"><span>11</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-2"><span>12</span></div>
    </div>
</div>

```html
<div class="cads-grid-container">
    <div class="cads-grid-row">
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-6"><span>1</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-6"><span>2</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-3"><span>3</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-3"><span>4</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-3"><span>5</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-3"><span>6</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-2"><span>7</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-2"><span>8</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-2"><span>9</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-2"><span>10</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-2"><span>11</span></div>
        <div class="cads-grid-col-sm-6 cads-grid-col-md-3 cads-grid-col-lg-2"><span>12</span></div>
    </div>
</div>
```

<!-- ### Reordering columns

Use `.cads-order-` classes for controlling the visual order of your content. These classes are responsive, so you can set the order by breakpoint (e.g., `.cads-order-1.cads-order-md-2`). Includes support for 1 through 12 across all five grid tiers.

<div class="cads-styleguide-grid cads-grid-container">
    <div class="cads-grid-row">
        <div class="cads-grid-col"><span>1</span></div>
        <div class="cads-grid-col cads-order-12"><span>2</span></div>
        <div class="cads-grid-col cads-order-1"><span>3</span></div>
    </div>
</div>

```html
<div class="cads-grid-container">
    <div class="cads-grid-row">
        <div class="cads-grid-col"><span>1</span></div>
        <div class="cads-grid-col cads-order-12"><span>2</span></div>
        <div class="cads-grid-col cads-order-1"><span>3</span></div>
    </div>
</div>
```

There are also responsive `.cads-order-first` and `.cads-order-last` classes that change the order of an element by applying order: -1 and order: 13 (order: $columns + 1), respectively. These classes can also be intermixed with the numbered `.cads-order-*` classes as needed.

<div class="cads-styleguide-grid cads-grid-container">
    <div class="cads-grid-row">
        <div class="cads-grid-col cads-order-last"><span>1</span></div>
        <div class="cads-grid-col"><span>2</span></div>
        <div class="cads-grid-col cads-order-first"><span>3</span></div>
    </div>
</div>

```html
<div class="cads-grid-container">
    <div class="cads-grid-row">
        <div class="cads-grid-col cads-order-last"><span>1</span></div>
        <div class="cads-grid-col"><span>2</span></div>
        <div class="cads-grid-col cads-order-first"><span>3</span></div>
    </div>
</div>
``` -->

<!-- ### Offsetting columns

You can offset grid columns using the `.cads-offset-*` classes, these are sized to match columns and used to move columns to the right. These classes increase the left margin of a column by * columns. For example, `.cads-offset-md-4` moves '.cads-grid-col-md-4` over four columns on the medium breakpoint.

<div class="cads-styleguide-grid cads-grid-container">
	<div class="cads-grid-row">
		<div class="cads-grid-col-4"><span>1</span></div>
		<div class="cads-grid-col-4 cads-offset-4"><span>2</span></div>
	</div>
	<div class="cads-grid-row">
		<div class="cads-grid-col-md-3 cads-offset-md-3"><span>1</span></div>
		<div class="cads-grid-col-md-3 cads-offset-md-3"><span>2</span></div>
	</div>
	<div class="cads-grid-row">
		<div class="cads-grid-col-3 cads-offset-1 cads-offset-md-4 cads-offset-lg-6"><span>1</span></div>
	</div>
</div>

```html
<div class="cads-grid-container">
	<div class="cads-grid-row">
		<div class="cads-grid-col-md-4"><span>1</span></div>
		<div class="cads-grid-col-md-4 cads-offset-md-4"><span>2</span></div>
	</div>
	<div class="cads-grid-row">
		<div class="cads-grid-col-md-3 cads-offset-md-3"><span>1</span></div>
		<div class="cads-grid-col-md-3 cads-offset-md-3"><span>2</span></div>
	</div>
	<div class="cads-grid-row">
		<div class="cads-grid-col-3 cads-offset-1 cads-offset-md-4 cads-offset-lg-6"><span>1</span></div>
	</div>
</div>
``` -->
