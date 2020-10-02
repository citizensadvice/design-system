# frozen_string_literal: true

Given("the Buttons component is on the page") do
  @component = DesignSystem::Buttons.new
  @component.load
end

When("I click on the {button-type} Button") do |button|
  @component.send(button).click
end

Then("all the buttons are present") do
  expect(@component).to be_all_there
end

Then("the background color of the {button-type} Button changes") do |button|
  expect(@component.background_color_of(button))
    .not_to eq(@component.initial_background_color_of(button))
end

Then("the text color of the {button-type} Button changes") do |button|
  expect(@component.text_color_of(button))
    .not_to eq(@component.initial_text_color_of(button))
end
