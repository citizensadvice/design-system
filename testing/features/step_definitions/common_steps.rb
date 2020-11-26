# frozen_string_literal: true

When("I skip to the {skip-link-area} part of the page") do |area|
  @component.tab_to(area)
  @component.active_element.send_keys(:enter)
end

Then("the URL will have linked me to the {skip-link-area} part of the page") do |area|
  area = "main-#{area}" if area == :content

  expect(page.current_url).to end_with("#cads-#{area}")
end

Then("there is a hidden link to quickly skip to the {skip-link-area} part of the page") do |area|
  @component.tab_to(area)

  expect(@component.active_skip_link_text).to eq(I18n.t("cads.header.skip_to_#{area}"))
end
