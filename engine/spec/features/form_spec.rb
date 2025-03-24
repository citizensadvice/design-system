# frozen_string_literal: true

RSpec.describe "example forms" do
  it "renders the people form" do
    visit example_forms_path

    # Submit empty form
    click_button "Save"

    # "first_name" is required
    expect(page).to have_css("p#person_first_name-error")

    # Fill in form fields
    fill_in "First name", with: "Francis"
    fill_in "Last name", with: "Example"

    # Submit form
    click_button "Save"

    expect(page).to have_field("person[first_name]", with: "Francis")
    expect(page).to have_field("person[last_name]", with: "Example")

    expect(page).to have_button("Save")
  end
end
