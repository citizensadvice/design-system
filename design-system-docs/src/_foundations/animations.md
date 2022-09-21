---
title: Animations
---

All animations are 0.3 seconds long. This is defined in the `$cads-animation-speed` variable. However you should beware of reduced motion user preferences. These can be checked using the `prefers-reduced-motion: reduce` media query.

For defining transitions use the `cads-transition-animation` mixin. This will automatically ignore transition animations if the user has set the reduce motion option. You can supply the prop to animate or if none is supplied `background, border` is used. Example:

```scss
@include cads-transition-animation();
// transition-property: background, border; transition-duration: 0.3s
@include cads-transition-animation(width);
// transition-property: width; transition-duration: 0.3s
```

Both of the above will produce `transition: none` if reduce motion is set.

Change the accessibility setting and hover over the button below to see an example:

<button class="cads-button">Background colour animates on hover</button>
