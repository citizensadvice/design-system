# 14. Deprecate form components in favour of form builder

Date: 2025-11-28

## Status

Accepted

## Context

We currently maintain two parallel implementations of our form components through the original view component interfaces as well as the newer form builder methods adopted by the design system in `v7.0.0`.

Maintaining two parallel implementations increases cost of development and causes regular drift as not all options are supported e.g. currently `cads_collection_radio_buttons` doesn't support the `size` or `layout` options.

Within the form builder methods we attempt to delegate to the underlying view component interfaces as much as possible. In practice this is rarely possible as the original view component interfaces were not designed with the Rails form builder in mind. Supporting this often requires using internal methods and causes limitations with the form builder e.g. it's not possible to use without a model where native `form_with` allows this.

We could greatly simplify our implementation and remove existing limitations if we move to own all the markup generated directly from form builder methods and delegated to the native Rails equivalents e.g. `label`, `text_field`, and `collection_radio_buttons`. In order to do this without increasing maintenance burden we should look to deprecate the view component form interfaces and move all applications over to the form builder.

The majority of our applications are already using form builder methods as they provide a significantly simpler and more predictable interface, with only a few instances of the view component form interfaces left. Ultimately the form builder has been a success and there should be little reason to use or maintain the original interfaces as a result.

## Decision

This decision marks a soft deprecation of view component interfaces for form elements in favour of form builder equivalents. Specifically the following components:

- `CitizensAdviceComponents::CheckboxGroup`
- `CitizensAdviceComponents::CheckboxSingle`
- `CitizensAdviceComponents::DateInput`
- `CitizensAdviceComponents::ErrorSummary`
- `CitizensAdviceComponents::Input`
- `CitizensAdviceComponents::RadioGroup`
- `CitizensAdviceComponents::Select`
- `CitizensAdviceComponents::Textarea`
- `CitizensAdviceComponents::TextInput`

We intend for the existing components to be available until _at least_ `v10.0.0` of `casebook_components` as we will need to ensure that all form builder methods have feature parity and work with teams to update their applications.

## Consequences

In order to fully deprecate the view component interfaces for form elements we must meet the following pre-requisites:

- Test coverage equivalent to view component interfaces. Currently we have good integration tests but minimal unit tests for the form builder methods themselves which makes refactoring harder
- Decoupling form builder methods from underlying view component interfaces
- Feature parity for available options
- Optionally, form builder interfaces updated to delegate to their native Rails counterparts where possible. This isn't a requirement but makes it significantly easier to maintain and use the methods as we can defer more logic to underlying Rails methods
- Optionally, the ability to use form builder components with or without a model. Currently only possible with a model. Made possible by the change above to delegate rendering to the equivalent rails helpers like `label`, `text_field`, and `collection_radio_buttons`

The positive consequences of these changes would be a single interface for form elements which would remove the maintenance burden and drift that comes from maintaining parallel implementations. Aligning with native Rails equivalents also simplifies documentation as we can focus on the parts that are custom.

If we identify use-cases that are not possible using form builder methods we should revisit this decision.
