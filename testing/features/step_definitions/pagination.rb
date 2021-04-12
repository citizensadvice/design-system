# frozen_string_literal: true

Given("an Example Pagination component is on the page") do
  pending # Write code here that turns the phrase above into concrete actions
end

Given("a Paging Info Pagination component is on the page") do
  @component = Pagination::PagingInfo.new.tap(&:load)
end

Then("the current page is highlighted") do
  pending # Write code here that turns the phrase above into concrete actions
end

Then("there are numerical buttons to skip to the {int} previous pages") do |_int|
  # Then('there are numerical buttons to skip to the {float} previous pages') do |float|
  pending # Write code here that turns the phrase above into concrete actions
end

Then("there are numerical buttons to skip to the {int} next pages") do |_int|
  # Then('there are numerical buttons to skip to the {float} next pages') do |float|
  pending # Write code here that turns the phrase above into concrete actions
end

Then("there are buttons to skip to the first and last page") do
  pending # Write code here that turns the phrase above into concrete actions
end

Then("there are buttons to skip to the next and previous page") do
  pending # Write code here that turns the phrase above into concrete actions
end

Then("the number of results is displayed") do
  expect(@component).to have_number_of_results
end
