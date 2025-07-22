# frozen_string_literal: true

RSpec.describe "collection radio buttons" do
  before do
    visit element_path("collection_radio_buttons")
  end

  it "renders a number of radio buttons" do
    within "#default_collection_radio_buttons" do
      expect(page).to have_unchecked_field("person[favourite_drink]", type: "radio", with: "0001")
      expect(page).to have_unchecked_field("person[favourite_drink]", type: "radio", with: "0000")
      expect(page).to have_unchecked_field("person[favourite_drink]", type: "radio", with: "8888")
    end
  end

  it "uses an id for the first item that can be targetted by cads_error_summary" do
    within "#default_collection_radio_buttons" do
      expect(page).to have_field("person_favourite_drink-input")
    end
  end

  it "renders a page heading" do
    within "#page_heading_radio_buttons" do
      expect(page).to have_css("legend h1.cads-page-title", text: "Favourite drink")
    end
  end
end
