# frozen_string_literal: true

Given("a Standard Callout component is on the page") do
  @component = Callouts::Standard.new.tap(&:load)
end

Given("an Example Callout component is on the page") do
  @component = Callouts::Example.new.tap(&:load)
end

Given("an Important Callout component is on the page") do
  @component = Callouts::Important.new.tap(&:load)
end

Given("an Adviser Callout component is on the page") do
  @component = Callouts::Adviser.new.tap(&:load)
end

Given("there are Nested Callout components on the page") do
  @component = Callouts::Nested.new.tap(&:load)
end

Then("a callout title and message are present") do
  expect(@component).to have_heading

  expect(@component).to have_message
end

Then("no label is present above the callout title") do
  expect(@component).not_to have_label
end

Then("a/an {string} label is present above the callout title") do |label|
  expect(@component.label.text).to eq(I18n.t("cads.callout.#{label.downcase}"))
end

Then("both callouts are rendered correctly") do
  expect(@component.outer_standard).to be_all_there(recursion: :one)
end
