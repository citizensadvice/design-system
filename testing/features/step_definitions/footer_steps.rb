# frozen_string_literal: true

Given("a Footer component is on the page") do
  @component = DesignSystem::Footer.new
  @component.load
end

When("I report a problem with this page") do
  @component.initial_form.website_feedback.click
end

Then("a report problem with this page link is present") do
  expect(@component.initial_form).to have_website_feedback
end

Then("each header item has at least 1 link below it") do
  expect(@component.category_titles).to all have_links
end

Then("a footer logo is present") do
  expect(@component.initial_form).to have_logo
end

Then("a copyright notice is present") do
  expect(@component.initial_form).to have_copyright
end

Then("a company info is present") do
  expect(@component.initial_form).to have_company_info
end

Then("a new window\\/tab is opened to report an issue with the page") do
  switch_to_newly_opened_window!(new_page: true)

  expect(page.current_url).to eq("https://www.research.net/r/J8PLH2H")
end
