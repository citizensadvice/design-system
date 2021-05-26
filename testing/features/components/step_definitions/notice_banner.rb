# frozen_string_literal: true

Given("a Standard Notice Banner component is on the page") do
  @component = NoticeBanner::Example.new.tap(&:load)
end

Then("a notice banner title and message are present") do
  expect(@component).to have_notice_banner_title
  expect(@component).to have_message
end
