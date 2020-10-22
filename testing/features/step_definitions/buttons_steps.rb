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

Then("the Primary button acts as a button") do
  expect(@component.primary.tag_name).to eq("button")

  expect(@component.primary[:type]).to eq("button")
end

Then("the Secondary button acts as a button") do
  expect(@component.secondary.tag_name).to eq("button")

  expect(@component.secondary[:type]).to eq("button")
end

Then("the Tertiary button acts as a button") do
  expect(@component.tertiary.tag_name).to eq("button")

  expect(@component.tertiary[:type]).to eq("button")
end
