# frozen_string_literal: true

RSpec.describe "buttons" do
  before do
    visit element_path("buttons")
  end

  it "renders a default button" do
    expect(page).to have_css(".cads-button__primary", text: "Default")
  end

  it "renders a secondary button" do
    expect(page).to have_css(".cads-button__secondary", text: "Secondary")
  end

  it "renders a button with type button" do
    expect(page).to have_css(".cads-button__primary[type=button]", text: "Button")
  end

  it "renders icon on the left side of button" do
    within "#icon_left" do
      expect(page).to have_css("span.cads-button__icon-left")
      expect(page).to have_css("svg.cads-icon--arrow-left")
    end
  end

  it "renders icon on the right side of button" do
    within "#icon_right" do
      expect(page).to have_css("span.cads-button__icon-right")
      expect(page).to have_css("svg.cads-icon--arrow-right")
    end
  end
end
