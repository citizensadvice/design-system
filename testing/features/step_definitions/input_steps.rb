# frozen_string_literal: true

Given("I have a Basic Input component on page") do
  @component = Input::Basic.new
  @component.load
end

Given("I have an Input with hint component on page") do
  @component = Input::Hint.new
  @component.load
end

Given("I have an Optional Input component on page") do
  @component = Input::Optional.new
  @component.load
end

Given("I have an Input with error component on page") do
  @component = Input::ErrorMessage.new
  @component.load
end

Then("there is a label") do
  expect(@component).to have_label
end

Then("there is a hint") do
  expect(@component).to have_hint
end

Then("there is no hint") do
  expect(@component).not_to have_hint
end

Then("there is an optional field") do
  expect(@component).to have_optional
end

Then("there is no optional field") do
  expect(@component).not_to have_optional
end

Then("there is an error message") do
  expect(@component).to have_error_message
end

Then("there is no error message") do
  expect(@component).not_to have_error_message
end

Then("I can type {string} into the text box") do |string|
  @component.input.send_keys(string)
end
