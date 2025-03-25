# frozen_string_literal: true

RSpec.describe "text areas" do
  before do
    visit element_path("text_areas")
  end

  it "renders a default text area, with 'name' and 'id' set correctly" do
    within "#default_text_area" do
      textarea = page.first("textarea")

      expect(textarea["name"]).to eql "person[address]"
      expect(textarea["id"]).to eql "person_address-input"
    end
  end

  it "renders a text area with a custom number of rows" do
    within "#custom_rows_text_area" do
      expect(page).to have_css("textarea[rows=12]")
    end
  end

  it "renders a page heading" do
    within "#page_heading_text_area" do
      expect(page).to have_css("h1.cads-page-title", text: "Address")
    end
  end
end
