# frozen_string_literal: true

Given("a default targeted content component is on the page") do
  @component = TargetedContent::Default.new.tap(&:load)
end

Given("an adviser targeted content component is on the page") do
  @component = TargetedContent::Adviser.new.tap(&:load)
end

Given("an anchored targeted content component is on the page") do
  @component = TargetedContent::Anchored.new.tap(&:load)
end

Given("a fallback targeted content component is on the page") do
  @component = TargetedContent::Fallback.new.tap(&:load)
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

Then("a targeted content title is present") do
  expect(@component).to have_heading
end

Then("the toggle button indicates it will expand") do
  expect(@component.heading).to have_expand_collapse

  expect(@component.heading.expand_collapse["aria-label"])
    .to start_with(I18n.t("cads.targeted_content.descriptive_label_show"))
end

Then("the toggle button indicates it will collapse") do
  expect(@component.heading).to have_expand_collapse

  expect(@component.heading.expand_collapse["aria-label"])
    .to start_with(I18n.t("cads.targeted_content.descriptive_label_hide"))
end

Then("I can see additional information") do
  expect(@component).to have_additional_information
end

Then("I can no longer see additional information") do
  expect(@component).not_to have_additional_information
end

Then("I can see a close button") do
  expect(@component.additional_information.close.text)
    .to eq(I18n.t("cads.targeted_content.close_label"))
end
