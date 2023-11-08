# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Callout, type: :component do
  include ActionView::Helpers::TagHelper

  subject { page }

  context "with default arguments" do
    before do
      render_inline(described_class.new(type: :standard)) { "Example content" }
    end

    it { is_expected.to have_selector ".cads-callout", text: "Example content" }
  end

  context "when missing type" do
    before do
      without_fetch_or_fallback_raises do
        render_inline(described_class.new) { "Example content" }
      end
    end

    it { is_expected.to have_selector ".cads-callout--standard" }
    it { is_expected.not_to have_selector ".cads-badge" }
  end

  context "when type is example" do
    before do
      render_inline(described_class.new(type: :example)) { "Example content" }
    end

    it { is_expected.to have_selector ".cads-callout--example" }
    it { is_expected.to have_selector ".cads-badge", text: "Example" }
  end

  context "when type is important" do
    before do
      render_inline(described_class.new(type: :important)) { "Example content" }
    end

    it { is_expected.to have_selector ".cads-callout--important" }
    it { is_expected.to have_selector ".cads-badge--important", text: "Important" }
  end

  context "when type is adviser" do
    before do
      render_inline(described_class.new(type: :adviser)) { "Example content" }
    end

    it { is_expected.to have_selector ".cads-callout--adviser" }
    it { is_expected.to have_selector ".cads-badge--adviser", text: "Adviser" }
  end

  context "with custom attributes" do
    before do
      render_inline described_class.new(
        type: :adviser,
        attributes: { "aria-labelledby": "my-custom-title" }
      ) do
        safe_join([
          tag.h2("Callout title", id: "my-custom-title"),
          tag.p("Example content")
        ])
      end
    end

    it { is_expected.to have_selector "section[aria-labelledby='my-custom-title']" }

    it { is_expected.to have_selector "h2#my-custom-title", text: "Callout title" }

    it { is_expected.to have_text "Example content" }
  end

  context "when deprecated title is provided" do
    before do
      allow(ActiveSupport::Deprecation).to receive(:warn)

      render_inline(described_class.new(type: :standard, title: "Deprecated title")) { "Example content" }
    end

    it "logs deprecation warning" do
      expect(ActiveSupport::Deprecation).to have_received(:warn)
        .with(/title attribute is deprecated/)
    end
  end

  context "when no content present" do
    before do
      render_inline(described_class.new(type: :standard))
    end

    it { is_expected.not_to have_selector ".cads-callout" }
  end
end
