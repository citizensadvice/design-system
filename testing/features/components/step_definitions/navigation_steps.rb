# frozen_string_literal: true

Given("a Default Navigation component is on the page") do
  if @logged_in
    @component = Navigation::Header.new.tap(&:load)
  else
    @component = Navigation::Default.new.tap(&:load)
  end
end

Given("a user is logged in") do
  @logged_in = true
end

Given("the navigation does not fit on the screen") do
  page.driver.browser.manage.window.resize_to(320, 568) unless device?
end

When("I open the dropdown menu") do
  @component.more_button.click
end

When("I close the dropdown menu") do
  @component.close_button.click
end

When("I tab onto the More button") do
  @component.tab_into_dropdown
end

When("I tab out of the dropdown menu") do
  @component.tab_through_dropdown
end

When("I press 'Escape'") do
  @component.send_keys(:escape)
end

When("I click outside of the menu") do
  @component.click_outside_navigation
end

Then("the dropdown toggle is not present") do
  expect(@component).to have_no_more_button
end

Then("the dropdown toggle is present") do
  expect(@component).to have_more_button
end

Then("the dropdown menu is closed") do
  expect(@component).to have_no_last_link
end

Then("the dropdown menu is open") do
  expect(@component).to have_last_link
end

Then("the Close button is present") do
  expect(@component).to have_close_button
end

Then("the More button is present") do
  expect(@component).to have_more_button
end

Then("the dropdown menu has header links") do
  expect(@component).to have_sign_out
end
