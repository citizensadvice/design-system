# frozen_string_literal: true

RSpec.describe "collection radio buttons" do
  before do
    visit element_path("collection_select")
  end

  it "renders a number of radio buttons" do
    within "#default_collection_select" do
      expect(page).to have_select(
        "Favourite ice cream",
        options: [
          "Vanilla",
          "Chocolate",
          "Strawberry",
          "Pistachio",
          "Cookie dough",
          "Salted caramel"
        ]
      )
    end
  end
end
