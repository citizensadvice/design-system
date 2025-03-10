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

  describe "width attributes" do
    it "renders the associated width input" do
      within "#text_field_with_width" do
        expect(page).to have_css ".cads-input--four-chars"
      end
    end
  end

  describe "additional attributes" do
    it "renders additional attributes passed to the field" do
      within "#text_field_with_additional_attributes" do
        expect(page).to have_css "input[data-example='custom-attribute']"
      end
    end
  end
end
