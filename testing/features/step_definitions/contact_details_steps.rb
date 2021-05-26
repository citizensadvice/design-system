# frozen_string_literal: true

Given("a Contact Details component is on the page") do
  @component = ContactDetails::Default.new.tap(&:load)
end

Then("there is at least 1 paragraph") do
  expect(@component.initial_form).to have_paragraphs
end

Then("the top paragraph is bold") do
  expect(@component.initial_form).to have_first_bold_paragraph
end
