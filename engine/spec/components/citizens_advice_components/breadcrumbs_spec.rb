# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Breadcrumbs, type: :component do
  subject { page }

  context "when no links are present" do
    before { render_inline described_class.new([]) }

    it { is_expected.to have_no_css ".cads-breadcrumbs" }
  end

  context "when there is only one item" do
    before do
      render_inline described_class.new(
        [{ title: "Home", url: "/" }]
      )
    end

    it { is_expected.to have_no_css ".cads-breadcrumbs" }
  end

  context "when links are provided" do
    before do
      render_inline described_class.new(sample_links, type: :collapse)
    end

    it { is_expected.to have_css "li", count: 3 }
    it { is_expected.to have_css "span[aria-current=location]", text: "Staying in the UK" }

    it "renders the breadcrumbs in full width mode by default" do
      expect(page).to have_css ".cads-breadcrumbs-wrapper"
    end
  end

  context "when no_collapse type is provided" do
    before do
      render_inline described_class.new(sample_links, type: :no_collapse)
    end

    it { is_expected.to have_css ".cads-breadcrumbs--no-collapse" }
  end

  context "when no type is provided" do
    before do
      without_fetch_or_fallback_raises do
        render_inline described_class.new(sample_links, type: nil)
      end
    end

    it { is_expected.to have_css ".cads-breadcrumbs--collapse" }
  end

  context "when not rendered on the current page" do
    before do
      render_inline described_class.new(
        sample_links,
        type: :collapse,
        current_page: false
      )
    end

    it { is_expected.to have_no_css "span[aria-current=location]" }
  end

  context "when not in full width mode" do
    before do
      render_inline described_class.new(
        sample_links,
        type: :collapse,
        full_width: false
      )
    end

    it { is_expected.to have_no_css ".cads-breadcrumb-wrapper" }
  end

  context "when links are passed with the old style hash format" do
    before do
      render_inline described_class.new(
        [
          { "title" => "Home", "url" => "/" },
          { "title" => "Immigration", "url" => "/immigration" },
          { "title" => "Staying in the UK" }
        ],
        type: :collapse
      )
    end

    it { is_expected.to have_css "li", count: 3 }
    it { is_expected.to have_css "span[aria-current=location]", text: "Staying in the UK" }
  end

  context "when deprecated links argument is provided" do
    before do
      allow(CitizensAdviceComponents.deprecator).to receive(:warn)

      render_inline described_class.new(
        links: sample_links
      )
    end

    it "logs deprecation warning" do
      expect(CitizensAdviceComponents.deprecator).to have_received(:warn)
        .with(/links attribute is deprecated/)
    end
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
