# frozen_string_literal: true

Given("an Error Summary component is on the page") do
  @component = DesignSystem::ErrorSummary.new
  @component.load
end

Then("the component will indicate there has been a problem") do
  expect(@component.initial_form).to have_title
end

Then("the component should list the issues in bullet point format") do
  expect(@component.initial_form).to have_errors
end

Then("the number of errors should equal the number of bullet points") do
  expect(@component.initial_form.error_quantity).to eq(@component.initial_form.errors.length)
end
