# frozen_string_literal: true

Then("there is a hidden link to quickly skip to the {skip-link-area} part of the page") do |area|
  @component.tab_to(area)

  expect(@component.active_skip_link_text).to eq(I18n.t("cads.header.skip_to_#{area}"))
end
