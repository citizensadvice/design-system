# frozen_string_literal: true

Given("a Default Breadcrumbs component is on the page") do
  @component = Breadcrumbs::Default.new
  @component.load
end

Given("a No Collapse Breadcrumbs component is on the page") do
  @component = Breadcrumbs::NoCollapse.new
  @component.load
end

Then("a series of breadcrumbs are present") do
  expect(@component).to have_breadcrumbs(minimum: 3)
end

Then("the initial breadcrumbs are all links") do
  expect(@component.all_but_last_breadcrumb).to all have_link
end

Then("the final breadcrumb isn't a link") do
  expect(@component.breadcrumbs.last).not_to have_link
end
