# frozen_string_literal: true

RSpec.describe "collection check boxes" do
  before do
    visit element_path("collection_check_boxes")
  end

  it "renders a number of check boxes" do
    expect(page).to have_unchecked_field("person[pizza_toppings][]", type: "checkbox", with: "Anchovies")
    expect(page).to have_unchecked_field("person[pizza_toppings][]", type: "checkbox", with: "Cheese")
    expect(page).to have_unchecked_field("person[pizza_toppings][]", type: "checkbox", with: "Pepperoni")
    expect(page).to have_unchecked_field("person[pizza_toppings][]", type: "checkbox", with: "Olives")
  end

  it "includes a hidden field to allow 'all unchecked' state to persist" do
    expect(page).to have_field("person[pizza_toppings][]", type: "hidden", with: "")
  end

  it "uses an id for the first item that can be targetted by cads_error_summary" do
    expect(page).to have_field("person_pizza_toppings-input")
  end

  it "remembers the selected values" do
    check "Cheese"
    check "Pepperoni"
    click_button

    expect(page).to have_checked_field("person[pizza_toppings][]", type: "checkbox", with: "Cheese")
    expect(page).to have_checked_field("person[pizza_toppings][]", type: "checkbox", with: "Pepperoni")

    expect(page).to have_unchecked_field("person[pizza_toppings][]", type: "checkbox", with: "Anchovies")
    expect(page).to have_unchecked_field("person[pizza_toppings][]", type: "checkbox", with: "Olives")
  end
end
