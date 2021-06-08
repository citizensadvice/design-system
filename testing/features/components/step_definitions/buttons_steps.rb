# frozen_string_literal: true

Given("the Primary Button component is on the page") do
  @component = Buttons::Primary.new.tap(&:load)
end

Given("the Secondary Button component is on the page") do
  @component = Buttons::Secondary.new.tap(&:load)
end

Given("the Tertiary Button component is on the page") do
  @component = Buttons::Tertiary.new.tap(&:load)
end

Given("the Link Button components are on the page") do
  @component = Buttons::LinkButton.new.tap(&:load)
end

Then("the Primary/Secondary/Tertiary button acts as a button") do
  expect(@component.button.tag_name).to eq("button")

  expect(@component.button[:type]).to eq("button")
end

Then("the Link buttons act as buttons") do
  expect(@component.buttons.map(&:tag_name)).to all eq("button")

  expect(@component.button_types).to all eq("button")
end
