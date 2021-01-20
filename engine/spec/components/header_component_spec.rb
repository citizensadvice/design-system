# frozen_string_literal: true

RSpec.describe DesignSystem::HeaderComponent do
  subject(:component) do
    render_inline(
      DesignSystem::HeaderComponent.new(
        links: [{ title: "Cymraeg", url: "?lang=cy" }],
        sign_in_out: { title: "Sign in", url: "/sign-in" }
      )
    )
  end

  it "renders header" do
    expect(component.at("header")).to_not be_nil
  end

  it "has skip links" do
    expect(component.css(".cads-skip-links a").map { |item| item.text.strip }).to eq [
      "Skip to navigation",
      "Skip to content",
      "Skip to footer"
    ]
  end

  it "has a search form" do
    expect(component.at("form[role='search']")).to_not be_nil
    expect(component.at("input[type='search']")).to_not be_nil
  end

  it "has links" do
    expect(component.css(".cads-header__links a").map { |item| item.text.strip }).to eq [
      "Cymraeg",
      "Sign in"
    ]
  end
end
