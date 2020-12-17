# frozen_string_literal: true

Given("the Default Footer component is on the page") do
  @component = Footer::Default.new.tap(&:load)
end

Given("the Minimal Footer component is on the page") do
  @component = Footer::Minimal.new.tap(&:load)
end

When("I report a problem with this page") do
  @component.website_feedback.click
end

Then("a report problem with this page link is present") do
  expect(@component).to have_website_feedback
end

Then("each header item has at least 1 link below it") do
  expect(@component.category_titles).to all have_links
end

Then("a footer logo is present") do
  expect(@component).to have_logo
end

Then("a copyright notice is present") do
  expect(@component).to have_copyright(text: I18n.t("cads.shared.copyright"))
end

Then("a company info is present") do
  expect(@component).to have_company_info
end

Then("I am presented with a form to report the issue about the page I am on") do
  switch_to_newly_opened_window!(new_page: true)

  expect(page.current_url).to eq("https://www.research.net/r/J8PLH2H")
end
