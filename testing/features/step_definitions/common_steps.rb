# frozen_string_literal: true

When("I am able to skip to the {skip-link-area} part of the page") do |area|
  @component.tab_to(area)

  expect(@component.active_element.text).to eq(I18n.t("cads.header.skip_to_#{area}"))
end
