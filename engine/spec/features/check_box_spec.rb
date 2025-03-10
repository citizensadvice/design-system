# frozen_string_literal: true

RSpec.describe "single check boxes" do
  before do
    visit element_path("check_box")
  end

  it "renders the visible unchecked checkbox" do
    expect(page).to have_unchecked_field("person[opted_in]", type: "checkbox", with: "1")
  end

  it "renders the label" do
    expect(page).to have_text("Opted in")
  end

  it "renders the hidden field which defaults to false" do
    expect(page).to have_field("person[opted_in]", type: "hidden", with: "0")
  end

  it "renders the visible checked checkbox" do
    expect(page).to have_checked_field("person[account_active]", type: "checkbox", with: "1")
  end
end
