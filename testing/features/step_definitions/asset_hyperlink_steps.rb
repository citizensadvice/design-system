# frozen_string_literal: true

Given("an Asset Hyperlink component is on the page") do
  @component = DesignSystem::AssetHyperlink.new
  @component.load
end

Then("a link to download a PDF is present") do
  expect(@component).to have_download_link
end

Then("the label includes a name at the beginning") do
  expect(@component.initial_form.download_link.text).to start_with("Test pdf")
end

Then("the label includes an icon") do
  "Complex TBD"
end

Then("the label includes the file size") do
  expect(@component.initial_form.download_size.text).to match(file_size)
end

Then("the label is a downloadable link") do
  expect(@component.initial_form.download_link["href"]).not_to be_nil

  expect(@component.initial_form.download_link["href"]).not_to be_empty
end
