# frozen_string_literal: true

Given("I have a Basic Input component on page") do
  @component = Input::Basic.new.tap(&:load)
end

Given("I have an Input component with a hint") do
  @component = Input::Hint.new.tap(&:load)
end

Given("I have an Optional Input component on page") do
  @component = Input::Optional.new.tap(&:load)
end

Given("I have an Input with error component on page") do
  @component = Input::ErrorMessage.new.tap(&:load)
end

Then("there is a label") do
  expect(@component).to have_title_label
end

Then("there is a hint") do
  expect(@component).to have_hint
end

Then("there is no hint") do
  expect(@component).not_to have_hint
end

Then("there is an optional label") do
  expect(@component).to have_optional_label
end

Then("there is no optional label") do
  expect(@component).not_to have_optional_label
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
