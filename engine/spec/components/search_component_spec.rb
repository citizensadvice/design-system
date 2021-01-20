# frozen_string_literal: true

RSpec.describe DesignSystem::SearchComponent do
  it "renders search form" do
    component = render_inline(
      DesignSystem::SearchComponent.new(action_url: "/search")
    )
    expect(component.at("form[role='search']")).to_not be_nil
    expect(component.at("input[type='search']")).to_not be_nil
    expect(component.at("button").text.strip).to eq "Search"
  end

  context "with input value" do
    it "hase search input with value" do
      component = render_inline(
        DesignSystem::SearchComponent.new(action_url: "/search", input_value: "Hello")
      )
      expect(component.at("input[type='search']").attr("value").strip).to eq "Hello"
    end
  end
end
