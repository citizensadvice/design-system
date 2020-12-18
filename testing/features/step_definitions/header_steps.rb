# frozen_string_literal: true

Given("a Standard Header component is on the page") do
  @component = Header::Standard.new.tap(&:load)
end

Then("a link to change language is present") do
  expect(@component).to have_change_language
end

Then("a login/logout link is present") do
  expect(@component).to have_login
end

When("I type {string} into the search box") do |search_term|
  @component.search_field.send_keys(search_term)
end

Then("I am able to search for {string}") do |search_term|
  @component.search_for(search_term)

  expect(@component.search_field.value).to eq(search_term)

  expect(@component.search_button.text).to eq(I18n.t("cads.search.submit_label"))
end
