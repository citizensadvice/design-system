---
title: Header
---

## Examples

### Standalone

<%= render(Shared::ComponentExample.new(:header, :default)) %>

### With navigation

<%= render(Shared::ComponentExample.new(:header, :with_navigation)) %>

The header is intended to be used alongside the navigation, although it works standalone, see the [navigation component docs](/components/navigation) for details on how to use the navigation component.

## JavaScript behaviour

If you plan to use this component you will need to initialise the following JavaScript:

```js
import initHeader from '@citizensadvice/design-system/lib/header';
initHeader();
```

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template using:

<%= render(Shared::ComponentExampleSource.new(:header, :default)) %>

### Slots API

The header component makes heavy use of [view component slots](https://viewcomponent.org/guide/slots.html). This allows each piece of the header to be configure each part of the header with a method.

Slots that have plural names like `skip_links` and `header_links` can be configured in flexible ways. Either by passing an array to the plural version of the method:

```erb
<%%= render CitizensAdviceComponents::Header.new do |c|
  c.header_links([{ title: "Example link", url: "/some-url" }])
end %>
```

Or by calling the singular method name multiple times:

```rb
<%%= render CitizensAdviceComponents::Header.new do |c|
  c.header_link(title: "Example link 1", url: "/some-url")
  c.header_link(title: "Example link 2", url: "/another-url")
end %>
```

### Logo slot

This is the only slot required by default. The logo slot can be configured in two different ways. Either as a plain link accepting a `title` and an optional `url` (defaults to `/`):

```erb
<%%= render CitizensAdviceComponents::Header.new do |c|
  c.logo(title: "Citizens Advice homepage", url: "/")
end %>
```

Or by passing a custom block to render your own HTML:

<%= render(Shared::ComponentExampleSource.new(:header, :with_custom_logo)) %>

### Skip links

Skip links are optional. We provide a default set for you but you can provide your own.

```erb
<%%= render CitizensAdviceComponents::Header.new do |c|
  c.skip_links([
    { title: "Skip to content", url: "#content" },
    { title: "Skip to footer", url: "#footer" }
  ])
end %>
```

If you use the defaults you'll need to be using the `Navigation` and `Footer` components and add a `#cads-main-content` ID to your main content area.

### Header links

Header links can be configured either by passing a list of hashes to `header_links` or by calling `header_links` multiple times with a `title` and `url`. Header links also accept an optional `current_site` flag.

```erb
<%%= render CitizensAdviceComponents::Header.new do |c|
  c.header_links([
    { title: "Public site", url: "/", current_site: true },
    { title: "AdviserNet", url: "/advisernet" },
    { title: "Cymraeg", url: "?lang=cy" }
  ])
end %>
```

### Search form slot

The search form is optional. In order to configure it you need to provide a `search_action_url` and optionally a `search_param` name (defaults to `:q`).

```erb
<%%= render CitizensAdviceComponents::Header.new do |c|
  c.search_form(search_action_url: "/search", search_param: :search)
end %>
```

### Account link slot

The account link slot can be configured in two different ways. Either as a plain link accepting a `title` and `url`:

```erb
<%%= render CitizensAdviceComponents::Header.new do |c|
  c.account_link(title: "Sign in", url: "/sign-in")
end %>
```

Or by passing a custom block to render your own HTML:

```erb
<%%= render CitizensAdviceComponents::Header.new do |c| %>
  <%% c.account_link do %>
    <%% c.account_link(title: "Sign in", url: "/sign-in") do %>
      <%%= form_tag("/sign-out", class: "cads-header__account-form", authenticity_token: false) do %>
        <%%= button_tag("Sign out", class: %w[cads-button__tertiary cads-header__sign-out js-cads-close-on-blur]) %>
      <%% end %>
    <%% end %>
  <%% end %>
<%% end %>
```

**Note:** If you use the custom block format you control the HTML rendered so you'll also need to handle styling yourself.

However, there are some basic `form` and `button` styles you can use to render a simple 'Sign out' button included in the design-system styles and shown in the example above.
