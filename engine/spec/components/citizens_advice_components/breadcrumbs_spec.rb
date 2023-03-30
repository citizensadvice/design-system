# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Breadcrumbs, type: :component do
  subject { page }

  context "when no links are present" do
    before { render_inline described_class.new(links: []) }

    it { is_expected.not_to have_selector ".cads-breadcrumbs" }
  end

  context "when there is only one item" do
    before do
      render_inline described_class.new(
        links: [{ title: "Home", url: "/" }]
      )
    end

    it { is_expected.not_to have_selector ".cads-breadcrumbs" }
  end

  context "when links are provided" do
    before do
      render_inline described_class.new(
        type: :collapse,
        links: sample_links
      )
    end

    it { is_expected.to have_selector "li", count: 3 }
    it { is_expected.to have_selector "span[aria-current=location]", text: "Staying in the UK" }

    it "renders the breadcrumbs in full width mode by default" do
      expect(page).to have_selector ".cads-breadcrumbs-wrapper"
    end
  end

  context "when no_collapse type is provided" do
    before do
      render_inline described_class.new(
        type: :no_collapse,
        links: sample_links
      )
    end

    it { is_expected.to have_selector ".cads-breadcrumbs--no-collapse" }
  end

  context "when no type is provided" do
    before do
      without_fetch_or_fallback_raises do
        render_inline described_class.new(
          type: nil,
          links: sample_links
        )
      end
    end

    it { is_expected.to have_selector ".cads-breadcrumbs--collapse" }
  end

  context "when not rendered on the current page" do
    before do
      render_inline described_class.new(
        type: :collapse,
        links: sample_links,
        current_page: false
      )
    end

    it { is_expected.not_to have_selector "span[aria-current=location]" }
  end

  context "when not in full width mode" do
    before do
      render_inline described_class.new(
        type: :collapse,
        links: sample_links,
        full_width: false
      )
    end

    it { is_expected.not_to have_selector ".cads-breadcrumb-wrapper" }
  end

  context "when links are passed with the old style hash format" do
    before do
      render_inline described_class.new(
        type: :collapse,
        links: [
          { "title" => "Home", "url" => "/" },
          { "title" => "Immigration", "url" => "/immigration" },
          { "title" => "Staying in the UK" }
        ]
      )
    end

    it { is_expected.to have_selector "li", count: 3 }
    it { is_expected.to have_selector "span[aria-current=location]", text: "Staying in the UK" }
  end

  private

  def sample_links
    [
      { title: "Home", url: "/" },
      { title: "Immigration", url: "/immigration" },
      { title: "Staying in the UK" }
    ]
  end
end
