# frozen_string_literal: true

RSpec.describe "text inputs" do
  before do
    visit element_path("text_inputs")
  end

  it "renders a default text input, with 'id' and 'name' set correctly" do
    within "#default_text_field" do
      input = page.first("input")

      expect(input["name"]).to eql "person[first_name]"
      expect(input["id"]).to eql "person_first_name-input"
    end
  end

  it "renders the associated width input" do
    within "#text_field_with_width" do
      expect(page).to have_css ".cads-input--four-chars"
    end
  end

  it "renders a page heading" do
    within "#page_heading_text_field" do
      expect(page).to have_css("h1.cads-page-title label", text: "First name")
    end
  end

  it "renders additional attributes passed to the field" do
    within "#text_field_with_additional_attributes" do
      expect(page).to have_css "input[data-example='custom-attribute']"
    end
  end
end
