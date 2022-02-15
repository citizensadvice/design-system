# frozen_string_literal: true
Given("the Example Disclosure component is on the page") do
  @component = Disclosure::Example.new.tap(&:load)
end

When("I open/close the disclosure component") do
  @component.toggle_button.toggle.click
end

Then("The disclosure component displays expanded content") do
  expect(@component.details).to be_visible
end

Then("The disclosure component no longer shows any expanded content") do
  expect(@component.details).not_to be_visible
end
