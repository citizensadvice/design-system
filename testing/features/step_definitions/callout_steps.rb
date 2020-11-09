# frozen_string_literal: true

Given("a Standard Callout component is on the page") do
  @component = Callout::Standard.new.tap(&:load)
end

Given("an Example Callout component is on the page") do
  @component = Callout::Example.new.tap(&:load)
end

Given("an Important Callout component is on the page") do
  @component = Callout::Important.new.tap(&:load)
end

Given("an Adviser Callout component is on the page") do
  @component = Callout::Adviser.new.tap(&:load)
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
