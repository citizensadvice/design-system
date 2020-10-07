# frozen_string_literal: true

Given("the Buttons component is on the page") do
  @component = DesignSystem::Buttons.new
  @component.load
end

Then("all the buttons are present") do
  expect(@component).to be_all_there
end
