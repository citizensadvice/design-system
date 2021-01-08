# frozen_string_literal: true

Given("a Default Targeted Content component is on the page") do
  @component = TargetedContent::Default.new.tap(&:load)
end

Given("an Anchored Targeted Content component is on the page") do
  @component = TargetedContent::Anchored.new.tap(&:load)
end

When("I expand/collapse the targeted content") do
  @component.heading.expand_collapse.click
end

When("I close the targeted content") do
  @component.additional_information.close.click
end

When("I jump to the targeted content") do
  @component.jump_to_targeted_content.click
end

Then("a targeted content title and expand\\/collapse button are present") do
  expect(@component).to have_heading

  expect(@component.heading).to have_expand_collapse
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
