# frozen_string_literal: true

Given("the Primary Button component is on the page") do
  @component = Button::Primary.new
  @component.load
end

Given("the Secondary Button component is on the page") do
  @component = Button::Secondary.new
  @component.load
end

Given("the Tertiary Button component is on the page") do
  @component = Button::Tertiary.new
  @component.load
end

Then("the Primary/Secondary/Tertiary button acts as a button") do
  expect(@component.button.tag_name).to eq("button")

  expect(@component.button[:type]).to eq("button")
end
