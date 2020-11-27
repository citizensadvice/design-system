# frozen_string_literal: true

Given('a Standard Search component is on the page') do
  @component = Search::Standard.new
  @component.load
end

Given('a Search With Value component is on the page') do
  @component = Search::WithValue.new
  @component.load
end

Then('the search field is clear') do
  expect(@component.cads_search.search_field.text).to eq("")
end

Then('I can search for {string}') do |search_term|
  @component.cads_search.search_field.send_keys(search_term)

  expect(@component.cads_search.search_field.value).to eq(search_term)

  expect(@component.cads_search).to have_search_button
end


