# frozen_string_literal: true

Given("a Default Breadcrumbs component is on the page") do
  @component = Breadcrumbs::Default.new
  @component.load
end

Then("a series of breadcrumbs are present") do
  expect(@component.initial_form).to have_breadcrumbs
end

Then("the initial breadcrumbs are all links") do
  expect(@component.initial_form.all_but_last_breadcrumb).to all have_link
end

Then("the final breadcrumb isn't a link") do
  expect(@component.initial_form.breadcrumbs.last).not_to have_link
end
