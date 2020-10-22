# frozen_string_literal: true

Given("the Primary Button component is on the page") do
  @component = Button::Primary.new
  @component.load
end

Then("the primary button acts as a button") do
  expect(@component.primary.tag_name).to eq("button")

  expect(@component.primary[:type]).to eq("button")
end
