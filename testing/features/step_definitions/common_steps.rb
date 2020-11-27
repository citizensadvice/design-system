# frozen_string_literal: true

When("I skip to the {skip-link-area} part of the page") do |area|
  @component.tab_to(area)
  @component.active_element.text
end

Then("the URL will have linked me to the {skip-link-area} part of the page") do |area|
  area = "main-#{area}" if area == :content

  expect(page.current_url).to end_with("#cads-#{area}")
end

Then("there are 3 hidden links that allow you to quickly skip to various parts of the page") do
  link_labels =
    [
      I18n.t("cads.header.skip_to_navigation"),
      I18n.t("cads.header.skip_to_content"),
      I18n.t("cads.header.skip_to_footer")
    ]
  expect(@component.skip_links.length).to eq(3)

  expect(@component.skip_links.map(&:text)).to eq(link_labels)
end
