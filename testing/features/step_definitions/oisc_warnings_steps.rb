# frozen_string_literal: true

Given("a Title and Description OISC component is on the page") do
  @component = OISCWarning::TitleDescription.new
  @component.load
end

Given("a Title Only OISC component is on the page") do
  @component = OISCWarning::TitleOnly.new
  @component.load
end

Given("a Sticky OISC component is on the page") do
  @component = OISCWarning::Sticky.new
  @component.load
end

When("I scroll to the bottom of the page") do
  @component.execute_script("window.scrollTo(0, 100000)")
  sleep 0.5
end

When("I scroll to the top of the page") do
  @component.execute_script("window.scrollTo(0, 0)")
  sleep 0.5
end

When("I close the sticky component") do
  @component.close_sticky.click
end

Then("the OISC title is visible") do
  expect(@component).to have_heading
end

Then("the OISC message is visible") do
  expect(@component).to have_description
end

Then("the OISC message is not visible") do
  expect(@component).not_to have_description
end

Then("the OISC message contains a link") do
  expect(@component).to have_link
end

Then("the OISC component is visible at the top of the viewport") do
  expect(@component.heading.vertical_position).to be > 900

  expect(@component.description.vertical_position).to be > 950
end

Then("the OISC component is no longer visible at the top of the viewport") do
  expect(@component.heading.vertical_position).to be < 200

  expect(@component.description.vertical_position).to be < 250
end

Then("the component will not be closeable") do
  expect(@component).not_to have_close_sticky
end
