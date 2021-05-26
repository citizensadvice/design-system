# frozen_string_literal: true

Given("an Example Error Summary form is on the page") do
  @form = ErrorSummary::Example.new.tap(&:load)
end

Then("the form indicates there is a problem") do
  expect(@form).to have_heading
end

Then("the form shows the errors in a list format") do
  expect(@form).to have_errors
end
