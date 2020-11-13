# frozen_string_literal: true

Given("a Default Page Review component is on the page") do
  @component = DesignSystem::PageReview.new.tap(&:load)
end

Then("the date that the page was last updated is present") do
  expect(@component.initial_form).to have_website_feedback
end

Then("the date is bold") do
  expect(@component.category_titles).to all have_links
end
