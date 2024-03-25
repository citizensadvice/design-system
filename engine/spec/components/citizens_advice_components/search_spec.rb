# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Search, type: :component do
  subject { page }

  context "with no arguments" do
    before { render_inline(described_class.new) }

    it { is_expected.to have_css ".cads-search" }
    it { is_expected.to have_field "Search through site content" }
    it { is_expected.to have_button "Search" }

    it "has no value" do
      input = page.find("input[type=search]").native
      expect(input.attr("value")).to be_nil
    end

    it "has default param name" do
      expect(page).to have_field "q"
    end

    context "when welsh language" do
      around { |example| I18n.with_locale(:cy) { example.run } }

      it { is_expected.to have_button "Chwilio" }
    end
  end

  context "with value" do
    before { render_inline(described_class.new(value: "Example value")) }

    it { is_expected.to have_field "Search through site content", with: "Example value" }
  end

  context "with custom param_name" do
    before { render_inline(described_class.new(param_name: :query)) }

    it "has custom param name" do
      expect(page).to have_field "query"
    end
  end
end
