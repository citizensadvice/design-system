# Grid

## Intro

Use <span class="html inline">.cads-grid-container</span> as a top level container for a responsive pixel width across all viewports and device sizes.

Rows are wrappers for columns. Each column has horizontal <span class="html inline">padding</span> (called a gutter) for controlling the space between them. This <span class="html inline">padding</span> is then counteracted on the rows with negative margins. This way, all the content in your columns is visually aligned down the left side.

In a grid layout, content must be placed within columns and only columns may be immediate children of rows.

Grid columns without a specified <span class="html inline">width</span> will automatically layout as equal width columns (the grid is flexbox based). E.g. four instances of <span class="html inline">.cads-grid-col-md</span> will each automatically be 25% wide from the medium breakpoint and up.

Column classes indicate the number of columns you’d like to use out of the possible 12 per row. So, if you want three equal-width columns across, you can use <span class="html inline">.cads-grid-col-4</span>. Column `width`s are set in percentages, so they’re always fluid and sized relative to their parent element.

Columns have horizontal <span class="html inline">padding</span> to create the gutters between individual columns.

To make the grid responsive, there are three grid breakpoints, one for each responsive breakpoint: all breakpoints (small), medium and large.

Grid breakpoints are based on minimum width media queries, meaning <strong>they apply to that one breakpoint and all those above it</strong>, e.g. <span class="html inline">.cads-grid-col-md-4</span> applies to medium and large but not the first <span class="html inline">sm</span> breakpoint.

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

For grids that are the same from the smallest of devices to the largest, use the <span class="html inline">.cads-grid-col</span> and <span class="html inline">.cads-grid-col-*</span> classes.

Using a single set of <span class="html inline">.cads-grid-col-{breakpoint}-*</span> classes, you can create a basic grid system that starts out stacked before becoming horizontal with at the specified breakpoint.

## Design/UX guidelines

Max columns for breakpoints as follows
* Small - 6
* Medium - 6
* Large - 12

Developers should adhere to these guidelines when setting up layout for content.

## Examples

The grid includes three tiers of predefined classes for building complex responsive layouts. Customize the size of your columns on small, medium and large devices however you see fit.

### All breakpoints

For grids that are the same from the smallest of devices to the largest, use the <span class="html inline">.cads-grid-col</span> and <span class="html inline">.cads-grid-col-*</span> classes. Specify a numbered class when you need a particularly sized column; otherwise, feel free to stick to <span class="html inline">.cads-grid-col</span>.

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

### Stacked to horizontal

Using a single set of  <span class="html inline">.cads-grid-col-lg-*</span> classes, you can create a basic grid system that starts out stacked before becoming horizontal at the large breakpoint (lg).

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
