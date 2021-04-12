# frozen_string_literal: true

Given("an Example Pagination component is on the page") do
  @component = Pagination::Example.new.tap(&:load)
end

Given("a Paging Info Pagination component is on the page") do
  @component = Pagination::PagingInfo.new.tap(&:load)
end

Then("the current page is highlighted") do
  if chrome?
    expect(@component.current_page.native.css_value("background-color")).to eq("rgba(1, 129, 118, 1)")
  else
    expect(@component.current_page.native.css_value("background-color")).to eq("rgb(1, 129, 118)")
  end
end

Then("there are numerical buttons to skip to the 2 previous pages") do
  expect(@component).to have_link(@component.previous_page(1))
  expect(@component).to have_link(@component.previous_page(2))
end

Then("there are numerical buttons to skip to the 2 next pages") do
  expect(@component).to have_link(@component.next_page(1))
  expect(@component).to have_link(@component.next_page(2))
end

Then("there are buttons to skip to the first and last page") do
  expect(@component).to have_link("First")
  expect(@component).to have_link("Last")
end

Then("there are buttons to skip to the next and previous page") do
  expect(@component).to have_link("Previous")
  expect(@component).to have_link("Next")
end

Then("the number of results is displayed") do
  expect(@component).to have_number_of_results
end
