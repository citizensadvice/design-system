# frozen_string_literal: true

When("I am able to tab through skip links") do |table|
  table.raw.first.each do |description|
    send_tabs(1)

    expect(@component.active_element.text).to eq(description)
  end
end

Then("a logo is present") do
  expect(@component.logo["title"]).to eq("Citizens Advice homepage")

  expect(@component.logo["href"]).not_to be_nil
end

Then("I am able to search") do
  @component.search_for("Anything")

  expect(@component.search_field.value).to eq("Anything")

  expect(@component.search_field["aria-label"]).to eq("Search through site content")

  expect(@component.search_button.text).to eq("Search")

  expect(@component.search_button["title"]).to eq("Submit search query")
end

Then("I can expand the search bar") do
  expect(@component.open_search_pane["title"]).to eq("Open search")

  @component.open_search_pane.click

  expect(@component).to have_search_field
end

Then("I can collapse the search bar") do
  expect(@component.open_search_pane["title"]).to eq("Close search")

  @component.open_search_pane.click

  expect(@component).not_to have_search_field
end
