# frozen_string_literal: true

When("I am able to skip to the {skip-link-area} part of the page") do |area|
  @component.tab_to(area)

  expect(@component.active_element.text).to eq(I18n.t("cads.header.skip_to_#{area}"))
end

Then("a logo is present") do
  expect(@component.logo["title"]).to eq(I18n.t("cads.shared.logo_title"))

  expect(@component.logo["href"]).not_to be_blank
end

Then("I am able to search") do
  @component.search_for("Anything")

  expect(@component.search_field.value).to eq("Anything")

  expect(@component.search_field["aria-label"]).to eq(I18n.t("cads.search.input_aria_label"))

  expect(@component.search_button.text).to eq(I18n.t("cads.search.submit_label"))

  expect(@component.search_button["title"]).to eq(I18n.t("cads.search.submit_title"))
end

Then("I can expand the search bar") do
  expect(@component.open_search_pane["title"]).to eq(I18n.t("cads.header.open_search"))

  @component.open_search_pane.click

  expect(@component).to have_search_field
end

Then("I can collapse the search bar") do
  expect(@component.open_search_pane["title"]).to eq(I18n.t("cads.header.close_search"))

  @component.open_search_pane.click

  expect(@component).not_to have_search_field
end
