# frozen_string_literal: true

RSpec.describe "date inputs" do
  before do
    visit element_path("date_inputs")
  end

  it "renders the 'day' input field" do
    within "#default_date_input" do
      expect(page).to have_css("label[for=person_date_of_birth-input]", text: "Day")
      expect(page).to have_field("person[date_of_birth(3i)]")
    end
  end

  it "renders the 'month' input field" do
    within "#default_date_input" do
      expect(page).to have_css("label[for=person_date_of_birth_2i]", text: "Month")
      expect(page).to have_field("person[date_of_birth(2i)]")
    end
  end

  it "renders the 'year' input field" do
    within "#default_date_input" do
      expect(page).to have_css("label[for=person_date_of_birth_1i]", text: "Year")
      expect(page).to have_field("person[date_of_birth(1i)]")
    end
  end

  it "indicates the fields are optional" do
    within "#default_date_input" do
      expect(page).to have_css(".cads-form-field__optional", text: "(optional)")
    end
  end

  it "doesn't include a hint" do
    within "#default_date_input" do
      expect(page).to have_no_css("p.cads-form-field__hint")
    end
  end

  it "renders a hint" do
    within "#date_input_with_hint" do
      expect(page).to have_css("p.cads-form-field__hint", text: "Hint text")
    end
  end

  it "stores and retrieves the day, month and year values in a Rails-compatible way" do
    within "#default_date_input" do
      fill_in "person[date_of_birth(3i)]", with: 13
      fill_in "person[date_of_birth(2i)]", with: 12
      fill_in "person[date_of_birth(1i)]", with: 2005
    end

    click_button

    expect(page).to have_field("person[date_of_birth(3i)]", with: "13")
    expect(page).to have_field("person[date_of_birth(2i)]", with: "12")
    expect(page).to have_field("person[date_of_birth(1i)]", with: "2005")
  end

  it "doesn't add the 'optional' label text" do
    within "#required_date_input" do
      expect(page).to have_no_css(".cads-form-field__optional")
    end
  end

  it "renders the error message" do
    within "#default_date_input" do
      fill_in "person[date_of_birth(3i)]", with: 25
      fill_in "person[date_of_birth(2i)]", with: 12
      fill_in "person[date_of_birth(1i)]", with: 3000
    end

    click_button

    within "#default_date_input" do
      expect(page).to have_css("div.cads-form-field.cads-form-field--has-error")
      expect(page).to have_css("div.cads-form-field__error-marker")
      expect(page).to have_css("p.cads-form-field__error-message")

      expect(page).to have_css("#person_date_of_birth-input.cads-input--error")
      expect(page).to have_css("#person_date_of_birth_2i.cads-input--error")
      expect(page).to have_css("#person_date_of_birth_1i.cads-input--error")
    end
  end
end
