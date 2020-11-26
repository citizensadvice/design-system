# frozen_string_literal: true

Then("there is a hidden link to quickly skip to the {skip-link-area} part of the page") do |area|
  @component.tab_to(area)

  expect(@component.active_skip_link_text).to eq("Skip to #{area}")
end
