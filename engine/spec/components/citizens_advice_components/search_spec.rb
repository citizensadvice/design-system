# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Search, type: :component do
  subject(:component) do
    render_inline(described_class.new)
  end

  it "renders search input" do
    expect(component.at(".cads-search")).to be_present
  end

  it "renders search button with label" do
    expect(component.at("button").text).to include "Search"
  end

  it "has no value" do
    expect(component.at("input[type=search]").attr("value")).to be_nil
  end

  it "has default param name" do
    expect(component.at("input[type=search]").attr("name")).to eq "q"
  end

  context "with value" do
    subject(:component) do
      render_inline(described_class.new(value: "Example value"))
    end

    it "has a value" do
      expect(component.at("input[type=search]").attr("value")).to eq "Example value"
    end
  end

  context "with custom param_name" do
    subject(:component) do
      render_inline(described_class.new(param_name: :query))
    end

    it "has custom param name" do
      expect(component.at("input[type=search]").attr("name")).to eq "query"
    end
  end

  context "when welsh language" do
    before { I18n.locale = :cy }

    it "has translated label" do
      expect(component.at("button").text).to include "Chwilio"
    end
  end
end
