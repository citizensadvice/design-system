# frozen_string_literal: true

RSpec.describe "date inputs" do
  before do
    visit element_path("date_inputs", **options)
  end

  context "default date input" do
    let(:options) { {} }

    it "renders the 'day' input field" do
      expect(page).to have_css("label[for=person_date_of_birth-input]", text: "Day")
      expect(page).to have_field("person[date_of_birth(3i)]")
    end

    it "renders the 'month' input field" do
      expect(page).to have_css("label[for=person_date_of_birth_2i]", text: "Month")
      expect(page).to have_field("person[date_of_birth(2i)]")
    end

    it "renders the 'year' input field" do
      expect(page).to have_css("label[for=person_date_of_birth_1i]", text: "Year")
      expect(page).to have_field("person[date_of_birth(1i)]")
    end

    it "indicates the fields are optional" do
      expect(page).to have_css(".cads-form-field__optional", text: "(optional)")
    end

    it "doesn't include a hint" do
      expect(page).to have_no_css("p.cads-form-field__hint")
    end

    it "stores and retrieves the day, month and year values in a Rails-compatible way" do
      fill_in "person[date_of_birth(3i)]", with: 13
      fill_in "person[date_of_birth(2i)]", with: 12
      fill_in "person[date_of_birth(1i)]", with: 2005

      click_button

      expect(page).to have_field("person[date_of_birth(3i)]", with: "13")
      expect(page).to have_field("person[date_of_birth(2i)]", with: "12")
      expect(page).to have_field("person[date_of_birth(1i)]", with: "2005")
    end

    it "renders the error message" do
      fill_in "person[date_of_birth(3i)]", with: 25
      fill_in "person[date_of_birth(2i)]", with: 12
      fill_in "person[date_of_birth(1i)]", with: 3000

      click_button

      expect(page).to have_css("div.cads-form-field.cads-form-field--has-error")
      expect(page).to have_css("div.cads-form-field__error-marker")
      expect(page).to have_css("p.cads-form-field__error-message")

      expect(page).to have_css("#person_date_of_birth-input.cads-input--error")
      expect(page).to have_css("#person_date_of_birth_2i.cads-input--error")
      expect(page).to have_css("#person_date_of_birth_1i.cads-input--error")
    end
  end

  context "date input with hint" do
    let(:options) { { hint: "Hint text"} }

    it "renders a hint" do
      expect(page).to have_css("p.cads-form-field__hint", text: "Hint text")
    end
  end

  context "required date input" do
    let(:options) { { required: true } }

    it "doesn't add the 'optional' label text" do
      expect(page).to have_no_css(".cads-form-field__optional")
    end
  end

  context "page heading date input" do
    let(:options) { { page_heading: true, required: true } }

    it "renders a page heading" do
      expect(page).to have_css("h1.cads-page-title", text: "Date of birth")
    end
  end
end
