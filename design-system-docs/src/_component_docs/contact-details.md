---
title: Contact details
---

Contact details - such as an address. Paragraphs inside of `.contact-details` have their vertical margins removed to allow for information to appear visually grouped.

The business name should be marked up as bold (`b`).

<%= render(Shared::ComponentExample.new(:contact_details, :example)) %>

## Using with Rails

If you are using the `citizens_advice_components` gem, you can call the component from within a template following the example below.

```rb
<%%= render(CitizensAdviceComponents::ContactDetails.new) do %>
  <p><b>Example organisation</b></p>
  <p>Telephone: 0300 555 5555</p>
  <p>Monday to Friday, 8am to 5pm</p>
  <p>Saturday, 8am to 4pm</p>
  <p><a href="http://example.com">Link to the website</a></p>
<%% end %>
```

The component accepts a single `content` block as shown above.
