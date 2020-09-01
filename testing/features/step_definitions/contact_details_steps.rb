# frozen_string_literal: true

Given("a Contact Details component is on the page") do
  @component = DesignSystem::ContactDetails.new
  @component.load
end

Then("a contact details block of text is present") do
  expect(@component.initial_form).to have_heading
end

Then("there is at least 1 paragraph") do
  expect(@component.initial_form).to have_paragraphs
end

Then("the top paragraph is bold") do
  expect(@component.initial_form.paragraphs.first).to be_bold
end
