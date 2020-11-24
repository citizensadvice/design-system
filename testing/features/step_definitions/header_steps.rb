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

Then("a header logo is present") do
  expect(@component.logo["title"]).to eq("Citizens Advice homepage")

  expect(@component.logo["href"]).not_to be_blank
end

When("I type {string} into the search box") do |search_term|
  @component.search_field.send_keys(search_term)
end

Then("I am able to search for {string}") do |search_term|
  @component.open_search_pane.click if mobile_phone?
  @component.search_field.send_keys(search_term)

  expect(@component.search_field.value).to eq(search_term)

  expect(@component).to have_search_button
end
