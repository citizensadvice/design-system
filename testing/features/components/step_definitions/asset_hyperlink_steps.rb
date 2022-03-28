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

Then("the label includes the file size") do
  # This matches either a regular integer - i.e. `3` or a float i.e. `6.5`
  # Followed by either KB or MB (Must be upper-case to avoid confusing screen-readers)
  #
  # "3 MB".match?(file_size)      #=> true
  # "6.5 KB".match?(file_size)    #=> true
  # "41.919 MB".match?(file_size) #=> true
  # "41.919 AB".match?(file_size) #=> false
  expect(@component.download_size.text).to match(/^\d+.?\d* [K|M]B$/)
end

Then("the label is a downloadable link") do
  expect(@component.download_link["href"]).not_to be_empty
end
