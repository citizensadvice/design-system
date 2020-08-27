# frozen_string_literal: true

Given("the Buttons component is on the page") do
  @component = DesignSystem::Buttons.new
  @component.load
end

When("I hover over the {button-type} Button") do |button|
  @component.send(button).hover
end

When("I click on the {button-type} Button") do |button|
  @component.send(button).click
end

Then("the background color of the {button-type} Button changes") do |button|
  "TBD complex"
end

Then("the text color of the {button-type} Button changes") do |button|
  "TBD complex"
end

Then("the Tertiary button text is less prominent than the {button-type} Button") do |button|
  "TBD complex"
end
