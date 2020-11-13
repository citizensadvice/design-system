# frozen_string_literal: true

Given("a Title and Description OISC component is on the page") do
  @component = OiscWarning::TitleDescription.new
  @component.load
end

Given("a Title Only OISC component is on the page") do
  @component = OiscWarning::TitleOnly.new
  @component.load
end

Given("a Sticky OISC component is on the page") do
  @component = OiscWarning::Sticky.new
  @component.load
end

When("I scroll to the bottom of the page") do
  scroll_to_bottom_of_page
end

When("I scroll to the top of the page") do
  scroll_to_top_of_page
end

When("I close the sticky component") do
  @component.wait_until_close_sticky_visible(wait: 5) if ios? || safari?
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

Then("the OISC component is visible at the top of the viewport") do
  expect(@component.heading.vertical_position).to be > 800

  expect(@component.description.vertical_position).to be > 850
end

Then("the OISC component is no longer visible at the top of the viewport") do
  expect(@component.heading.vertical_position).to be < 200

  expect(@component.description.vertical_position).to be < 250
end

Then("the component will not be closeable") do
  expect(@component).not_to have_close_sticky
end
