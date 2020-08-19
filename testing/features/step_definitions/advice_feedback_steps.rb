# frozen_string_literal: true

Given("a/an Advice Feedback component is on the page") do
  @component = DesignSystem::AdviceFeedback.new
  @component.load
end

When("I inform Citizens Advice that the advice was useful") do
  @component.initial_form.yes.click
end

When("I inform Citizens Advice that the advice was not useful") do
  @component.initial_form.no.click
end

When("I offer a typed reason for why the advice was not useful") do
  @component.negative_response_form.reasons.last.click
  @component.negative_response_form.freetext_box.send_keys("It sucks!")
  @component.negative_response_form.submit.click
end

When("I select a reason that the advice was not useful") do
  @component.negative_response_form.select_random_reason
  @component.negative_response_form.submit.click
end

When("I try to submit the form without providing any feedback") do
  AutomationLogger.debug("No direct input selected; but a pre-determined one might be present!")
  @component.negative_response_form.submit.click
end

When("I change my mind about giving feedback") do
  @component.negative_response_form.close.click
end

Then("I am thanked for providing feedback") do
  expect(@component.positive_response_form.flash_message.text).to eq("Thank you for your feedback.")
end

Then("the header says {string}") do |string|
  expect(@component.page_title.text).to eq(string)
end

Then("I must provide more information") do
  expect(@component).to have_negative_response_form

  expect(@component.negative_response_form).to have_reasons
end

Then("I am able to provide feedback") do
  expect(@component).to be_all_there(recursion: :one)
end

Then("I am forced to provide feedback") do
  expect(@component.negative_response_form).to have_error_message

  expect(@component.negative_response_form.error_header.text)
    .to eq("There is a problem with 1 field\nSelect a feedback option")
end
