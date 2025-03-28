# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Disclosure, type: :component do
  subject { page }

  context "with default arguments" do
    before do
      render_inline described_class.new(
        closed_summary: "Show",
        open_summary: "Hide"
      ).with_content("Example content")
    end

    it { is_expected.to have_text "Example content" }

    it "renders the closed summary text" do
      expect(page).to have_css "[data-label-when-hiding='Show']"
    end

    it "renders the open summary text" do
      expect(page).to have_css "[data-label-when-showing='Hide']"
    end

    it "has aria-expand set to false on initial render" do
      expect(page).to have_css "[aria-expanded=false]"
    end

    it "has aria-controls set to the id of the disclosure content" do
      expect(page).to have_css "[aria-controls=show-disclosure-details]"
    end
  end

  context "when there is no open summary text" do
    before do
      render_inline described_class.new(
        closed_summary: "Show"
      ).with_content("Example content")
    end

    it "shows the closed summary text when open" do
      expect(page).to have_css "[data-label-when-showing='Hide this section, Show']"
    end
  end

  context "when there is no closed summary text" do
    before do
      render_inline described_class.new(
        closed_summary: nil
      ).with_content("Example content")
    end

    it { is_expected.to have_no_css ".cads-disclosure" }
  end

  context "when there is no disclosure content" do
    before do
      render_inline described_class.new(
        closed_summary: "Show",
        open_summary: "Hide"
      )
    end

    it { is_expected.to have_no_css ".cads-disclosure" }
  end

  context "when there is custom id" do
    before do
      render_inline described_class.new(
        closed_summary: "Show",
        open_summary: "Hide",
        id: "my-id"
      ).with_content("Example content")
    end

    it { is_expected.to have_css "[aria-controls='my-id']" }
  end

  context "when additional attributes are provided" do
    subject(:component) do
      render_inline described_class.new(
        closed_summary: "Show",
        open_summary: "Hide",
        additional_attributes: { "data-additional": "example" }
      ).with_content("Example content")
    end

    it { is_expected.to have_css "[data-additional='example']" }
  end
end
