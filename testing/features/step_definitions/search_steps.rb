# frozen_string_literal: true

Given("a Standard Search component is on the page") do
  @component = Search::Standard.new.tap(&:load)
end

Given("a Search With Value component is on the page") do
  @component = Search::WithValue.new.tap(&:load)
end

Then("the search field is clear") do
  expect(@component.search_field.value).to be_empty
end

Then("the user is able to search for {string}") do |search_term|
  @component.search_for(search_term)

  expect(@component.search_field.value).to eq(search_term)

  expect(@component.search_button.text).to eq(I18n.t("cads.search.submit_label"))
end

Then("the search field has a pre-defined term") do
  expect(@component.search_field.value).not_to be_empty
end
