# Animations

All animations are 0.3s long. This is defined in the <span class="html inline">$cads-animation-speed</span> variable. However you should beware of reduced motion user preferences. These can be checked using the <span class="html inline">prefers-reduced-motion: reduce</span> media query. For defining transitions use the <span class="html inline">cads-transition-animation</span> mixin. This will automatically ignore transition animations if the user has set the reduce motion option. You can supply the prop to animate or if none is supplied <span class="html inline">background, border</span> is used. Example:

<pre class="html"><code>
@include cads-transition-animation(); // transition-property: background, border; transition-duration: 0.3s
@include cads-transition-animation(width);  // transition-property: width; transition-duration: 0.3s
</code></pre>

Both of the above will produce <span class="html inline">transition: 0</span> if reduce motion is set.

<pre class="html"><code>transition: none;</code></pre>

Change the accessibiilty setting and hover over the button below to see an example:

<button class="cads-button">Background colour animates on hover</button>
