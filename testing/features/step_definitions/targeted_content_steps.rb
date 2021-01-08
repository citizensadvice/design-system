# frozen_string_literal: true

Given("a Default Targeted Content component is on the page") do
  @component = TargetedContent::Default.new.tap(&:load)
end

Given("an Anchored Targeted Content component is on the page") do
  @component = TargetedContent::Anchored.new.tap(&:load)
end

When("I expand the targeted content") do
  @component.expand.click
end

When("I collapse the targeted content") do
  @component.collapse.click
end

When("I close the targeted content") do
  @component.close.click
end

When("I jump to the targeted content") do
  @component.links.last.click
end

Then("a targeted content title and expand button are present") do
  expect(@component).to have_heading

  expect(@component).to have_expand
end

Then("I can see additional information") do
  expect(@component).to have_additional_information
end

Then("I can no longer see additional information") do
  expect(@component).not_to have_additional_information
end

Then("the targeted content is scrolled into view") do
  :still_no_op_yet
end
