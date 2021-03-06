# frozen_string_literal: true

Given("a page review component is on the page") do
  @component = PageReview::Example.new.tap(&:load)
end

Then("the date that the page was last reviewed is present") do
  expect(@component.reviewed_on.text).to start_with("Page last reviewed on")
end

Then("the date is bold") do
  expect(@component).to have_bold_date
end
