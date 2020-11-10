# frozen_string_literal: true

Given("an Example Error Summary component is on the page") do
  @component = ErrorSummary::Example.new.tap(&:load)
end

Then("the component indicates there is a problem") do
  expect(@component).to have_heading
end

Then("the component lists the issues in bullet point format") do
  expect(@component).to have_errors
end

Then("there is an error for each bullet point") do
  expect(@component.error_quantity).to eq(@component.errors.length)
end
