# frozen_string_literal: true

Given('I have a Basic Input component on page') do
  @component = Input::Basic.new
  @component.load
end

Then('there is a label') do
  expect(@component).to have_label
end

Then('there is no hint') do
  pending
end

Then('I can type {string} into the text box') do |string|
  @component.input.send_keys(string)
  sleep 4
end

