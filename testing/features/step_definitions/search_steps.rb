# frozen_string_literal: true

Given("a Standard Search component is on the page") do
  @component = Search::Standard.new
  @component.load
end

Given("a Search With Value component is on the page") do
  @component = Search::WithValue.new
  @component.load
end

Then("the search field is clear") do
  expect(@component.cads_search.search_field.value).to eq("")
end

Then("I can search for {string}") do |search_term|
  @component.cads_search.search_field.send_keys(search_term)

  expect(@component.cads_search.search_field.value).to eq(search_term)

  expect(@component.cads_search).to have_search_button
end

Then("I can search for the pre-defined value {string}") do |pre_defined_value|
  expect(@component.cads_search.search_field.value).to eq(pre_defined_value)

  expect(@component.cads_search).to have_search_button
end

Then("the search field is filled with {string}") do |pre_defined_value|
  expect(@component.cads_search.search_field.value).to eq(pre_defined_value)
end

Then("I can delete the pre-defined value") do
  @component.clear_field

  expect(@component.cads_search.search_field.value).to eq("")
end
