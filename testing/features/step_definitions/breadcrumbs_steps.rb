# frozen_string_literal: true

@future_release @v1.11.0+
Given("a Breadcrumbs component is on the page") do
  @component = DesignSystem::Breadcrumbs.new
  @component.load
end

@future_release @v1.11.0+
Then("a series of breadcrumbs are present") do
  expect(@component.initial_form).to have_breadcrumbs
end

@future_release @v1.11.0+
Then("the initial breadcrumbs are all links") do
  expect(@component.initial_form.all_but_last_breadcrumb).to all have_link
end

@future_release @v1.11.0+
Then("the final breadcrumb isn't a link") do
  expect(@component.initial_form.breadcrumbs.last).not_to have_link
end
