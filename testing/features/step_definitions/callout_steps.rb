# frozen_string_literal: true

Given("a Standard Callout component is on the page") do
  @component = Callout::Standard.new
  @component.load
end

Given("an Example Callout component is on the page") do
  @component = Callout::Example.new
  @component.load
end

Then("a callout title and message are present") do
  expect(@component).to have_heading

  expect(@component).to have_message
end

Then("a/an {string} label is present above the callout title") do |label|
  expect(@component.warning).to eq(label)
end
