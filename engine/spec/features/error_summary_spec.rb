# frozen_string_literal: true

RSpec.describe "error summary" do
  before do
    visit element_path("error_summary")
  end

  it "doesn't show the error summary if there are no errors" do
    expect(page).to have_no_css("div.cads-error-summary")
  end

  context "with validation errors" do
    before { click_button }

    it "shows errors within an error summary component" do
      error_summaries = page.find_all(".cads-error-summary__list a")
      error_hrefs = error_summaries.pluck("href")
      error_messages = error_summaries.map(&:text)

      expect(error_hrefs).to contain_exactly("#person_first_name-input", "#person_date_of_birth-input")
      expect(error_messages).to contain_exactly("First name can't be blank", "Date of birth can't be blank")
    end
  end
end
