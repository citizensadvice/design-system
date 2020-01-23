# Animations

All animations are 0.3s long. This is defined in the `$cads-animation-speed` variable. However you should beware of reduced motion user preferences. These can be checked using the `prefers-reduced-motion: reduce` media query. For defining transitions use the `cads-transition-animation` mixin. This will automatically ignore transition animations if the user has set the reduce motion option. You can supply the prop to animate or if none is supplied `all` is used. Example:

<pre class="css"><code>
@include cads-transition-animation(); // transition: all 0.3s
@include cads-transition-animation(width);  // transition: width 0.3s
</code></pre>

Both of the above will produce `transition: 0` if reduce motion is set.

<pre class="css"><code>transition: none;</code></pre>

Change the accessibiilty setting and hover over the button below to see an example:

<button class="cads-button">Background colour animates on hover</button>
