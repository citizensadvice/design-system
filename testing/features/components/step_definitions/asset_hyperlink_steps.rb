# frozen_string_literal: true

Given("an Asset Hyperlink component is on the page") do
  @component = AssetHyperlink::Example.new.tap(&:load)
end

Then("a link to the PDF is present") do
  expect(@component).to have_download_link
end

Then("the label includes a name at the beginning") do
  expect(@component.download_link.text).to start_with("Test PDF")
end

Then("the label includes an icon") do
  expect(@component.download_icon_content).not_to be_empty
end

Then("the label includes the file size") do
  expect(@component.download_size.text).to match(file_size)
end

Then("the label is a downloadable link") do
  expect(@component.download_link["href"]).not_to be_empty
end
