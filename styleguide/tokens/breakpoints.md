# Breakpoints

## SASS mixins

### Media breakpoint up

Targeting screen sizes from minimum breakpoint width

<pre><code class="css">
@include cads-media-breakpoint-up(sm) { ... }
@include cads-media-breakpoint-up(md) { ... }
@include cads-media-breakpoint-up(lg) { ... }

// Example usage:
@include cads-media-breakpoint-up(sm) {
  .some-class {
    display: block;
  }
}
</code></pre>

### Media breakpoint down

Targeting screen sizes up to maximum breakpoint width

<pre><code class="css">
@include cads-media-breakpoint-down(sm) { ... }
@include cads-media-breakpoint-down(md) { ... }
@include cads-media-breakpoint-down(lg) { ... }

// Example usage:
@include cads-media-breakpoint-down(lg) {
  .some-class {
    display: block;
  }
}
</code></pre>

### Media breakpoint only

Targeting a single segment of screen sizes using the minimum and maximum breakpoint widths

<pre><code class="css">
@include cads-media-breakpoint-only(sm) { ... }
@include cads-media-breakpoint-only(md) { ... }
@include cads-media-breakpoint-only(lg) { ... }

// Example usage:
@include cads-media-breakpoint-only(md) {
  .some-class {
    display: block;
  }
}
</code></pre>

### Media breakpoint between

Targeting screen sizes between multiple breakpoint widths

<pre><code class="css">
@include cads-media-breakpoint-between(sm, lg) { ... }
@include cads-media-breakpoint-between(md, lg) { ... }

// Example usage:
@include cads-media-breakpoint-between(md, lg) { ... }
  .some-class {
    display: block;
  }
}
</code></pre>
