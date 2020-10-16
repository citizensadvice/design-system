# frozen_string_literal: true

Given('a Title and Description OISC component is on the page') do
  @component = OISCWarning::TitleDescription.new
  @component.load
end

Given('a Title Only OISC component is on the page') do
  @component = OISCWarning::TitleOnly.new
  @component.load
end

Then('the OISC title is visible') do
  expect(@component).to have_heading
end

Then('the OISC message is visible') do
  expect(@component).to have_description
end

Then('the OISC message is not visible') do
  expect(@component).not_to have_description
end

Then('the OISC message contains a link') do
  expect(@component).to have_link
end
