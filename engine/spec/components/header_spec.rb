# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Header, type: :component do
  context "with no slots" do
    subject(:component) do
      render_inline(described_class.new)
    end

    it "does not render" do
      expect(component.at("header")).not_to be_present
    end
  end

  context "with logo" do
    subject(:component) do
      render_inline(described_class.new) do |header|
        header.logo(title: "Logo title", url: "/homepage")
      end
    end

    subject(:logo) { component.at(".cads-logo") }

    it "renders a logo" do
      expect(logo).to be_present
      expect(logo.text.strip).to eq "Logo title"
      expect(logo.attr("href")).to eq "/homepage"
    end
  end
end
