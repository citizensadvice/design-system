# frozen_string_literal: true

When("I am able to skip to the {skip-link-area} part of the page") do |area|
  @component.tab_to(area)

  expect(@component.active_element.text).to eq(I18n.t("cads.header.skip_to_#{area}"))
end

Then("a logo is present") do
  expect(@component.logo["title"]).to eq(I18n.t("cads.shared.logo_title"))

  expect(@component.logo["href"]).not_to be_blank
end

Then("I am able to search for {string}") do |search_term|
  @component.search_for(search_term)

  expect(@component.search_field.value).to eq(search_term)

  expect(@component.search_button.text).to eq(I18n.t("cads.search.submit_label"))
end
