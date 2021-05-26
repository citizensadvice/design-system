# frozen_string_literal: true

Given("an Example Error Summary form is on the page") do
  @form = ErrorSummary::Example.new.tap(&:load)
end

Then("the component indicates there is a problem") do
  expect(@form).to have_heading
end

Then("the component shows the errors in a list format") do
  expect(@form).to have_errors
end
