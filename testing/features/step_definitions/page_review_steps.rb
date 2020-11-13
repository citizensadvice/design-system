# frozen_string_literal: true

Given("a Standard Page Review component is on the page") do
  @component = PageReview::Standard.new.tap(&:load)
end

Then("the date that the page was last reviewed is present") do
  expect(@component).to have_reviewed_on
end

Then("the date is bold") do
  expect(@component).to have_bold_date
end
