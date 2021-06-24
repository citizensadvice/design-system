# frozen_string_literal: true

Given("I have a Basic Input form on page") do
  @form = Input::Basic.new.tap(&:load)
end

Given("I have an Input form with a hint") do
  @form = Input::Hint.new.tap(&:load)
end

Given("I have an Optional Input form on page") do
  @form = Input::Optional.new.tap(&:load)
end

Given("I have an Errored Input form on page") do
  @form = Input::ErrorMessage.new.tap(&:load)
end

Then("there is a label") do
  expect(@form).to have_title_label
end

Then("there is a hint") do
  expect(@form).to have_hint
end

Then("there is no hint") do
  expect(@form).not_to have_hint
end

Then("there is an optional label") do
  expect(@form).to have_optional_label
end

Then("there is no optional label") do
  expect(@form).not_to have_optional_label
end

Then("there is an error message") do
  expect(@form).to have_error_message
end

Then("there is no error message") do
  expect(@form).not_to have_error_message
end

When("I type {string} into the text box") do |text|
  @form.input.send_keys(text)
end

Then("the text box has a value of {string}") do |text|
  expect(@form.input.value).to eq(text)
end
