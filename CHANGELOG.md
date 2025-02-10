## v6.4.1-alpha.0

### 10 February 2025

**Fix**
- Make breakpoints configurable by products


## v6.4.0

### 22 January 2025

**New**

- Add `page_heading` option to input fields, allowing users to make an input label a page heading.
- Improvements to summary list component:
  - Improves default spacing around component
  - Accounts for paragraph elements within rows
  - Rails interface accepts a new `hide_empty_rows` option to control whether rows with blank values are shown
- Add the ability to have text in a footer column
- New greedy navigation implementation

  For backwards compatibility the old greedy navigation entrypoint will continue to work but will be removed in a future version. The existing code should look something like this:

  ```js
  import greedyNav from '@citizensadvice/design-system/lib/greedy-nav/index';
  greedyNav.init();
  ```

  To switch to the new entrypoint update your application to use the following code:

  ```js
  import { initNavigation } from "@citizensadvice/design-system"
  initNavigation();
  ```

**Fix**
- Improves screen reader experience when interacting with checkbox and radio groups in an error state

## v6.3.0

### 5 December 2024

**New**
- Add support for Rails 8
- Drop support for Rails 6.1

## v6.2.0

### 13 November 2024

**New**
- Grid: updated grid on large viewports, changing the gutter from 40px to 32px

## v6.1.0

### 22 October 2024

**New**
- Header: allow `lang` attribute in the header links slot

**Fix**
- Footer: add default aria label fallback when no custom feedback link title is specified

## v6.0.0

### 11 July 2024

**Breaking changes**

- Remove a number of deprecations from the view components.
  - Remove deprecated callout title attribute
  - Remove deprecated feedback_url from footer
  - Remove deprecated content slot from section links
- Remove compiled CSS from distributed package: We historically bundled a compiled version of the CSS as lib.css in the distributed package. The intent was to provide an option for projects not using SCSS for styles. However no projects use this method of distributing the styles and font-loading was broken when using the compiled version of the styles so we've made the decision to remove this method of distribution.

**New**
- Summary list component
- Provides two new configuration option when using the SCSS styles:
  - `$cads-font-path` to provide a custom path to control font loading in your application
  - `$cads-enable-icon-font` to enable or disable the legacy icon font (defaults to `true`)
- Consistent javascript module imports: Allow all modules to be imported using a consistent interface, either via:
  ```js
  import { initModuleA, initModuleB } from "@citizensadvice/design-system
  ```
  
  Or directly via:
  
  ```js
  import { initMyModule } from "@citizensadvice/design-system/lib/my-module"
  ```

  For backwards compatibility all existing entrypoints are still supported but may be removed in future versions.

**Fix**
- Make grid configurable by products
- The new office address is now the default in the footer component and the old address has been removed.


## v5.8.1

### 8 March 2024

**Fix**

- Footer component: commonise legal summary fallback text

## v5.8.0

### 29 February 2024

**New**

- Remove support for end-of-life Ruby 3.0.x versions
- Targeted content: changed icon from plus/minus to chevron
- Removes the icon from external links
- Footer component: Updated fallback legal summary to automatically reflect the new registered office on moving day

## v5.7.0

### 12 February 2024

**New**

- Include Rails 7.1 in supported version
- Remove Rails 6.0 from supported versions
- Remove support for Ruby 2.7
- Callout: Deprecate `title` attribute; replace with more general  `attributes`
- Inputs: added optional `id` attribute
- Selects: remove unused (but required) `type` attribute

## v5.6.0

### 18 October 2023

**New**

- Date input component: Adds a new date input component.
- Select: Adds a new 'Select' component.

## v5.5.0

### 5 September 2023

**New**

- Footer: allows customising the `legal_summary`
- Header: Fix error if header javascript is initialised when no search form is present
- Input: Replace the `required` attribute on inputs with `aria-required`
- Page form: Introducing a new `.cads-page-form` class to be used mainly for form pages.
- Search: Add `autocomplete="off"` to search field
- Section links: Add new `custom_content` slot and deprecate use of standard `content` block, use slots for whole API.
- Tables: adding `responsive_headers` optional argument. It defaults to `true` and toggles the responsive stacking functionality.
- SCSS: Allows nav link colours to be customised using dedicated language variables.
- SCSS: Adds a new `cads-grid-col-width` function which allows us to get the percentage width for a given number of grid columns.
- SCSS: Add a new `cads-prose-direct-descendants` class which scopes prose styles to direct descendants using the `>` child combinator selector
- SCSS: Add `.cads-visually-hidden` class as alias to `.cads-sr-only` to match Sass mixin name.
- Engine: Fix label being assigned as checkbox attribute in Ruby 3+
- Engine: Haml is no longer a dependency of the Rails engine. All component templates now use ERB internally. This doesn't affect the ability to use Haml in app code. If you were unintentionally relying on `haml-rails` being present in your app you will need to add it to your project Gemfile.
- Engine: Add support for ViewComponent 3. The `citizens_advice_components` engine now supports both ViewComponent 2 and 3.

**Bugfixes**

- Footer: Fix borders when using minimal footer
- Greedy nav: use theme colour for the background, not the brand colour
- Notice banner: when the content spreads over multiple lines, then the label remains vertically centred against the content.
- On this page: Fix css columns overflow bug with expandable on this-page elements.
- Engine: Bundle Welsh translations for core date formats. The rails-i18n gem historically provided these but the cy locale was removed in `7.0.6` due to lack of support

## <sub>v5.4.0</sub>

#### _Aug. 24, 2022_

**New**
- 🔓 Disclosure: Add optional `id` and `additional_attributes`

**Bugfixes**

- Header: Don't render right column when only logo is present (engine only)
- Navigation: Add background to colour language
- 🧭 GreedyNav: Fix minor HTML validation issue
- 🔗 Header: Renamed skip to content link
- Inputs and targeted content: Change the focus contrast to meet the accessibility requirements
- 🛑️ Error summary and message: Change text colour and weight to meet accessibility requirements
- 📋 Optional form fields: Fix an issue identified in an accessibility report related to pseudo content. The class `$cads-form-field__optional` no longer generates brackets as part of the css. For instance, if you have something like this in your codebase: `<span class="cads-form-field__optional">optional</span>`, you'll want to change it to: `<span class="cads-form-field__optional">(optional)</span>`.
- 🎯 Targeted content: Fix missing label in name of close button
- 📱 Section links: Fix accessibility issues with visual headings and list mark-up
- 📋 Form hints: Add aria-describedby to form input when a hint exists

## <sub>v5.3.0</sub>

#### _Jul. 19, 2022_

**New**

- 🔗 Links: Allow opting-out of external link icon styles using `$cads-enable-external-link-icon`
- 📋 Form group: Add `legend_heading` to `options` for one question per page forms
- 🔗 Links: Document links no longer present their appended file icon to screen
  readers
- 🔗 Links: Relflow long links so they do not add scrollbars to the viewport
- 🔓 Disclosure: Adds new `Disclosure` view component
- 🥾 Footer: Add more flexible `feedback_link` slot and deprecate `feedback_url` argument.
- 🥾 Footer: Support `external` icon for column links and deprecate`icon` property. Previous option was too generic, only support external links.
- 🥾 Footer: Fix accessibility issue with external link icons using old icon font and reading out content. Use new SVG icons.
- 🛤️ Expand version ranges for `citizens_advice_components` to support Rails 7


**Bugfixes**

- 👤 Header: Fix accessibility issue with search toggle
- 👤 Header: Fix minor HTML validation issue with search form
- 🧂 Tables: Add `scope: col` to `th` cells
- 🧂 Tables: `thead` is no longer incorrectly nested within `tbody`
- 🎯 Targeted content: Fix validation issues with HTML
- 🔗 Pagination links: Remove redundant `navigation` role
- 📜 On this page: Add missing type to toggle buttons
- 🛑️ Error summary: Fixed scrolling to the input label/legend
- 🛑️ Error summary: Fixed accessibility issue with the error heading
- 🏋 Icons: Fix syntax error with close icon view component
- 🔗 Links: Fix external link styles when used outside of the main www.citizensadvice.org.uk domain.
- 🥾 Footer: Use simpler `Time.current.year` rather than `Time.zone.today.year` for footer year. Allows component to be more portable and usable outside of a Rails context.
- 🤫 Fix deprecation warning with newer versions of view_component


## <sub>v5.2.0</sub>

#### _Feb. 28, 2022_

**Bugfixes**

- 📱 Section Links: Using `cads-list-no-bullet` styles to make the font consistent on smaller screens.
- 🔗 Links: Style links with `rel=external` in `.cads-prose` as a more reliable way of determining external links.
- 🛂 Ids: Radio buttons and checkbox `id` attributes are now generated using the input's index instead of value

**New**
- 📜 On this page: Adds new `On this page` view component
- 🛑️️ Error summary: Adds new `Error Summary` view component

## <sub>v5.1.0</sub>

#### _Nov. 17, 2021_

**Bugfixes**
- 🧂 Tables: Account for possibly nil cells

**New**
- ➡️️ Buttons: Adds new `Button` view component with support for icons
- 🏋 SVG Icons: Added view component SVG icons
- 📦 Checkbox and Checkbox groups are now available
- Full Ruby 3 support for `citizens_advice_components`

## <sub>v5.0.0</sub>

#### _Oct. 11, 2021_

**Breaking changes**

- 🔠 Fonts: removed support for legacy browser fonts (only woff and woff2 remain)
- 🗑️ Remove legacy haml partials and locale files. The `citizens_advice_components` gem is now the canonical way to use components with Rails.

**New**

- 🥾 Footer: Supports dynamic copyright year
- 🍑 Assets: Fonts and SVGs now available in `/assets`
- 👤 Header: Support custom logo slot for providing product specific logos

**Bugfixes**

- 🧂 Tables: Added render guards for missing headers and empty rows
- 🔠 Fonts: Updated Open Sans to v27
- 🔍 Search: Match button colour on hover
- `TextInput` and `Textarea` components: allow consumers to specify a value (!)
- 🥖 Breadcrumbs: Don't render when there is only one item.

## <sub>v4.2.0</sub>

#### _Aug. 2, 2021_

**Bugfixes**

- 👤 Header: Focussing on header link no longer makes search box jump

**New**

- 👤 Header: Adjusted header link classes in preparation for view component move
- New ViewComponents for the design system engine:
  - `TextInput`
  - `Input`
  - `FormField`
  - `Table`

## <sub>v4.1.1</sub>

#### _Jun. 17, 2021_

**Bugfixes**

- 🥖 Breadcrumbs: Hard coded 'Home' link has been removed (you must now specify it yourself)
- 📃 Typography: spacing and sizing updates
- ❗ Error summary: Removed technical language from example and docs
- 🧂 Tables: Don't style plain `table` selector, always require `cads-table`

## <sub>v4.1.0</sub>

#### _May. 20, 2021_

**Bugfixes**

- 🖨️ Print Styles: Link URLs now break
- 🎯 Targeted content: Fix error thrown when anchoring to an ID starting with a number, e.g. #41za
- 🎯 Targeted content: Fix title and border colours
- 👤 Header: The sign out button now has the visual appearance of a button
- 🗣️ Callouts: Rendered as sections with an aria-label if `title` is provided in the hash
- 📻 Radio buttons: Show the correct selected style

**New**

- 📻 Radio buttons: Radio button options now accepted a checked paramater

## <sub>v4.0.5</sub>

#### _Mar. 26, 2021_

**New**

- 🔗 Links: Links and Link Buttons no longer have default browser outline
- 🌠 Logo: Add a transparent bottom border to the logo link

**Bugfixes**

- 🧭 GreedyNav: Fix greedy nav behaviour when resizing

## <sub>v4.0.4</sub>

#### _Mar. 18, 2021_

**Bugfixes**

- 👤 Header: open/close search button title is now translated correctly
- 🍩 Settings: created additional colour variables to allow extra header theming

**New**

- 🎯 Targeted content: Option to remove the close button.

**Chores**

- 🗣️ Remove unused callout.js module
- 🧂 Remove deprecated tables.js module

## <sub>v4.0.3</sub>

#### _Feb. 26, 2021_

**Bugfixes**

- 🧭 Navigation: Fixed border colour of active nav buttons
- 🎯 Targeted content: +/- icons are vertically centred
- 🎯 Targeted content: will now scroll back to targeted content on close
- 🔗 Link Buttons: pointer is now displayed on hover

## <sub>v4.0.2</sub>

#### _Feb. 4, 2021_

**New**

- 🎯 Targeted content: you can now specifiy the heading level of the title element
- 🧂 Tables: Responsive tables no longer require javascript!

**Bugfixes**

- 🥖 Breadcrumbs: Layout adjustments when viewed on small screen
- 🔗 Link Buttons: fixed a visual bug with focus styling
- 🗣️ Callouts: add styles for variable heading levels
- 🎯 Targeted content: applies adjacent header margin correctly
- 🌎 Navigation: tabbing off last item in the dropdown closes the dropdown
- 📰 Print styles updated

## <sub>v4.0.1</sub>

#### _Jan. 21, 2021_

**New**

- 👤 Header links: support for no javascript added

**Bugfixes**

- 🌎 Navigation: More / Close arrow correction
- 🌎 Navigation: More dropdoen menu appears in device gesture control flow
- 🔗 Pagination links: Apply focus state to active page

## <sub>v4.0.0</sub>

#### _Jan. 14, 2021_

**Breaking changes**

- 💥 Remove related content styles from the design system (NP-1152)
- 🗣️ Callouts: New badge and modifier classes
  - Modifier classes use BEM style, e.g. `cads-callout--adviser` vs. `cads-callout-adviser`
  - Variants now use new `cads-badge` element for labels
- 🔗 Pagination links: Now have flex layout, fixes spacing between each item. All pagination list items require a `cads-paging__item` class.

**New**

- 📛 Badges: New `cads-badge` element used in callouts and targeted content
- 🍞 Breadcrumbs: New layout - chevrons at the front for increased legibility, layout bugs fixed (NP-1425)
- 🗣️ Callouts: Support callouts within callouts
- ⚽️ Footer: Update copyright year in footer (NP-1338)
- 📋 Footer Feedback: add a class to allow selection of footer feedback link
- 🔗 Header: Links in the header now accept a `current_site` boolean in the `link` object to render a span instead of a link
- 🔗 Links: added external link styling. Links within cads-prose are styled automatically (NP-1382)
- 🌎 Navigation: Header links are now added to the 'More' dropdown and no-js support (NP-1235)
- 🎯 Targeted content: New adviser specific variant

**Bugfixes**

- 🥾 Footer: Correct spelling of policy research
- 🌎 Navigation: Fix visited link colour in global nav
- ⬜ Tables: Give tables an explicit white background to allow them to be used against darker backgrounds
- 🌎: Navigation: Padding, spacing and mobile design improvements (NP-1026)
- 🎯 Targeted content: Design updates to targeted content button styles
- 🤕 Header: Search reveal button now has correct focus highlight. (NP-1330)
- 🏈 Footer: Use the grid to control footer alignment. (NP-1318)

**Docs**

- 📇 Contact Details: documentation updated (NP-1028)

## <sub>v3.2.0</sub>

#### _Dec. 3, 2020_

**New**

- 🍞 Breadcrumbs: added `.cads-breadcrumb-wrapper` to be used when breadcrumbs are used outside of the grid.
- 👞 Footer: Logo link can be set by haml template locals
- 👤 Header: Logo link can be set by haml template locals(NP-1188)
- 🎯 Targeted content: Now uses accesible disclosure pattern instead of `details` and `summary`

**Bugfixes:**

- Buttons: Limit transition to just the `background` property to avoid unwanted transition animations (NP-1372)
- Breadcrumbs: add `display: inline-block` to individual crumbs. Fixes additional space after each breadcrumb (NP-1186)
- Breadcrumbs: Remove redundant `title` attribute, duplicated link text (NP-1277)

## <sub>v3.1.0</sub>

#### _Nov. 26, 2020_

**New**

- Footer: links accept icon option, which is displayed after then link label

## <sub>v3.0.0</sub>

#### _Nov. 23, 2020_

**Breaking Changes**

- Footer: links are no longer provided by default, see documentation for details
- Header: Local options have changed, see documentation for details

**New**

- ⬆️ Footer: Supply feedback link and links using template locals (NP-662)
- 🔗 Header: Add skip links, provide option to override main content anchor link (NP-1181)

**Removals**

- Remove OISC warnings from design-system (NP-1285)
- Removed standalone `logo_clickable` component. Only used within header and footer
- Removed standalone `website_feedack` component. Only ever used within footer
  details of local option structure.

**Bugfixes**

- Callout: Don't render empty `.cads-callout-label` for standard callouts (no label)
- Footer: links are wrapped in a `nav` element and aria labelled as "Footer Navigation"
- Footer: Fix spacing and responsive styling (NP-1033)
- Forms: Add `value` attribute to input haml partial
- Forms: Fix error message display on inline radio buttons and fixed width inputs (NP-1275)
- Forms: Add `name` attribute to input haml partial
- Forms: Add `value` attribute to input haml partial
- Header: Correctly guard for when header is not present
- Header: Fix spacing and grid sizing around search form (NP-1024)
- Links: pseudo selector order fixed for generic links and footer links
- Pagination: Update pagination designs and add reference aria examples
- Search: Update search partial to accept `search_param` and current `input_value`
- Search: Normalise search button styles and use 44px height. Removed `cads-button` from search input

## <sub>v2.0.0</sub>

#### _Nov. 4, 2020_

**Breaking changes**:

- i18n: Rails I18n API translated haml templates (NP-974)
- Typography: removed typography utility classes (NP-1074)
- List: removed list utility classes (with exception of `.cads-list-no-bullet`) (NP-1074)
- Forms: Don't style raw `input` and `textarea` elements
- Forms: Updated all forms classnames to use consistent BEM conventions
- Forms: Removed `radio_group_small`, `radio_group`. Inline and small are now two separate modifiers
- Forms: Refactor radio component. Fix line-height for wrapping text
- Layout: Split `cads-main-content` out into `cads-page-title` and `cads-page-content`

**New features**:

- 🆕 Forms: Added character width modifiers to inputs: `2ch`, `4ch`, `8ch`, `16ch`

**Bugfixes**:

- Forms: Make success message a block element, no width constraints
- Forms: Increase spacing between labels and hints
- Forms: Normalise spacing between fields
- Forms: No width constraints on inputs or textareas
- Typography: fixed adjacent header margin for headers with 'Add reference' buttons
- Lists: align list markers with grid
- Lists: cater for `p` inside `li` in prose content

## <sub>v1.15.0</sub>

#### _Oct. 27, 2020_

- Bugfix: Spacing on page review component
- Add default to all colour variables to allow overriding in themes
- Add support for anchor links opening targeted content elements
- Updated foundations and grid documentation
- Initial prep for translations support

## <sub>v1.14.0</sub>

#### _Oct. 22, 2020_

- Bugfix: fix issue with form labels when hint is ommitted
- Remove % width from error summary component
- Add `.js-cads-greedy-nav` class to header navigation and fix greedy nav config
- Update visited links to consistently use link-visited-colour
- Remove margin-bottom from page-review component

## <sub>v1.13.0</sub>

#### _Oct. 13, 2020_

- NP-895 Rename and refactor breadcrumb hash to accept a type var _(breaking change)_
- `breadcrumb_links: { ... }` becomes `breadcrumbs: { type => ..., breadcrumb_links => { ... }}`
- NP-895 Add breadcrumb variant that does not collapse on mobile
- NP-895 Move search, breadcrumb

## <sub>v1.12.0</sub>

- NP-978 Remove advice feedback component

#### _Oct. 12, 2020_

- NP-756 Advisernet related content component
- Update oisc_warning component to accept a hash

## <sub>v1.11.0</sub>

#### _Oct. 7, 2020_

- NP-472 New OISC Warning component

## <sub>v1.10.1</sub>

#### _Sep. 30, 2020_

- NP-924 Callout headings bug
- NP-895 Correct footer class and SCSS
- NP-895 Fix search appearance

## <sub>v1.10.0</sub>

#### _Sep. 23, 2020_

- NP-289 New button styles with depressed state when clicked.

## <sub>v1.9.3</sub>

#### _Sep. 16, 2020_

- NP-806 Bug: Page scroll

## <sub>v1.9.2</sub>

#### _Sep. 15, 2020_

- NP-714 Upgrade Storybook to v6
- NP-856 Fix focus styles in error summary

## <sub>v1.9.1</sub>

#### _Sep. 10, 2020_

- NP-816 Fix active/focus state of Greedy Nav
- NP-852 Firefox button states
- NP-839 Print styles bug fix
- Set node v14 in .nvmrc
- NP-745 Move VR tests into /testing/visual-regression
- NP-737 Install pa11y
- NP-739 Create wcag-test task
- NP-738 Create wcag-test:ci task

## <sub>v1.9.0</sub>

#### _Sep. 7, 2020_

- NP-744 Run Browser tests inside CI pipeline
- NP-642 Header takes language switcher paramaters

## <sub>v1.8.1</sub>

#### _Aug. 26, 2020_

- NP-530 Add icons for references

## <sub>v1.8.0</sub>

#### _Aug. 20, 2020_

- NP-465 GreedyNav works with IE11
- NP-530 Add advisernet hover colour

## <sub>v1.7.1</sub>

#### _Aug. 13, 2020_

- NP-708 Bug fix missing nav icon
- NP-721 Bug fix error summary component
- NP-575 Grid update to accommodate navigation
- NP-646 Notice banner margins

## <sub>v1.7.0</sub>

#### _Aug. 10, 2020_

- NP-618 PDF Icons and links
- NP-643 Remove support for Scottish Gaelic

## <sub>v1.6.0</sub>

#### _Aug. 6, 2020_

- NP-640 Site navigation visually aligned with main site content
- NP-575 Grid spacing
- NP-617 Image tag formatting

## <sub>v1.5.1</sub>

#### _Aug. 4, 2020_

- NP-464 Greedy Nav - co-locate scss to fix webpack compilation error

## <sub>v1.5.0</sub>

#### _Aug. 4, 2020_

- NP-464 Greedy Nav rewrite using Typescript and Tests

## <sub>v1.4.4</sub>

#### _Jul. 24, 2020_

- NP-590 Bug fix Targeted Content button element

## <sub>v1.4.3</sub>

#### _Jul. 20, 2020_

- NP-581 Font loading

## <sub>v1.4.2</sub>

#### _Jul. 20, 2020_

- NP-581 Font loading

## <sub>v1.4.1</sub>

#### _Jul. 17, 2020_

- NP-580 Fonts not loading

## <sub>v1.4.0</sub>

#### _Jul. 10, 2020_

- NP-557 Dynamic nav links
- NP-525 Contact details

## <sub>v1.3.0</sub>

#### _Jul. 9, 2020_

- NP-523 Callout type changed

## <sub>v1.2.0</sub>

#### _Jul. 7, 2020_

- NP-521 Tables

## <sub>v1.1.0</sub>

#### _Jul. 1, 2020_

- NP-501 Storybook tweaks and adviser template
- NP-477 Expand all targeted content for adviser
- NP-470 Adviser callout styling
- NP-543 Design tweaks

## <sub>v1.0.0</sub>

#### _Jun. 11, 2020_

- NP-478 Sign in/out header props
- Storybook layout improvements: no toolbar, text link to new tab
- Fix Callout label colour

## <sub>v0.18.1</sub>

#### _Jun. 10, 2020_

- NP-447 Logo cuttoff fix
- NP-445 Header spacing

## <sub>v0.18.0</sub>

#### _Jun. 8, 2020_

- NP-441 Related Content component
- NP-453 Numbered lists positioning

## <sub>v0.17.1</sub>

#### _Jun. 4, 2020_

- NP-439 Grid gutter size
- NP-452 Last breadcrumb not a link

## <sub>v0.17.0</sub>

#### _Jun. 3, 2020_

- NP-446 Search button in header shouldn't have box-shadow on mobile
- NP-444 Website Feedback component: ensure link and icon wrap to new line together
- NP-332 Remove title from callout
- NP-451 Callout background colour

## <sub>v0.16.0</sub>

#### _May. 27, 2020_

- NP-411 Search pagination component

## <sub>v0.15.0</sub>

#### _May. 19, 2020_

- NP-415 Remove footer feedback component

## <sub>v0.14.0</sub>

#### _May. 14, 2020_

- NP-401 Replace symbol hash access syntax for string
- NP-381 Changelog

## <sub>v0.13.1</sub>

#### _May. 13, 2020_

- NP-391 Targetted content layout
- NP-388 Callout type naming
- NP-394 Breadcrumb title field rename

## <sub>v0.13.0</sub>

#### _May. 13, 2020_

- NP-274 Print styles

## <sub>v0.12.1</sub>

#### _May. 11, 2020_

- Bug fix priority-nav import package

## <sub>v0.12.0</sub>

#### _May. 7, 2020_

- NP-352 Targeted content integration
- NP-239 Advice Feedback
- NP-380 Release script update

## <sub>v0.11.0</sub>

#### _May. 5, 2020_

- NP-350 switch priority-nav to @citizensadvice owned package
- NP-325 Remove H4 from Contact Details
- NP-334 Bug Stroke on active links is too heavy
- NP-333 Error summary component
- NP-248 Bug: bulleted list default styles
- NP-238 Callout headings restructure

## <sub>v0.10.0</sub>

#### _Apr. 21, 2020_

- NP-290 Success message
- NP-214 Link benefits to the fully qualified URL of the public website.
- NP-301 Textarea control
- NP-312 Replace em with rem

## <sub>v0.9.0</sub>

#### _Apr. 14, 2020_

- NP-229 Navigation voiceover improvements

## <sub>v0.8.0</sub>

#### _Apr. 9, 2020_

- NP-270 Dynamic notice banner label
- NP-38 Add contact details component

## <sub>v0.7.0</sub>

#### _Apr. 6, 2020_

- NP-237 Website feedback component
- NP-39 Revealable panels

## <sub>v0.6.1</sub>

#### _Apr. 1, 2020_

- Update design of buttons

## <sub>v0.6.0</sub>

#### _Mar. 27, 2020_

- NP-243 Design Updates
- NP-12 Page Review component
- NP-241 Fix the way fonts are referenced
- Use correct option for setting navigation dropdown label

## <sub>v0.5.1</sub>

#### _Mar. 25, 2020_

- NP-217 Fix Greedy Nav tabbing behaviour in IE 11

## <sub>v0.5.0</sub>

#### _Mar. 24, 2020_

- NP-209 HAML story cleanup
- NP-52 Header
- NP-172 Header nav buttons

## <sub>v0.4.1</sub>

#### _Mar. 13, 2020_

- NP-16 Design System Automation Framework
- NP-52 Header

- NP-200, NP-205 Update priority-nav to latest, fixing tabbing and resizing bugs

## <sub>v0.4.0</sub>

#### _Mar. 12, 2020_

- NP-122 Styleguide improvements
- NP-139 Input boxes and textareas
- NP-138 radio buttons
- Switch to npm from yarn
- Logo cleanup
- NP-206 bug fix small radio button style
- NP-185 render HAML stories using Ruby
- NP-208 bug fix radio button stories

## <sub>v0.3.3</sub>

#### _Mar. 5, 2020_

- NP-11: Drop down menu items laid out vertically _bug_

## <sub>v0.3.2</sub>

#### _Mar. 5, 2020_

- NP-11: Fix layout of navigation when used in website
- NP-11: Expose initialisation function with default options

## <sub>v0.3.1</sub>

#### _Mar. 5, 2020_

- NP-91: Amend callout

## <sub>v0.3.0</sub>

#### _Mar. 4, 2020_

- NP-11: Update navigation with Greedy/Priority+ UI pattern

## <sub>v0.2.0</sub>

#### _Mar. 2, 2020_

- Test release

## <sub>v0.1.1</sub>

#### _Mar. 2, 2020_

- Header updated

## <sub>v0.1.0</sub>

#### _Mar. 2, 2020_

- Add npm release script
