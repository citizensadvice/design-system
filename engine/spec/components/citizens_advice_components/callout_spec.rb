# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Callout, type: :component do
  include ActionView::Helpers::TagHelper

  subject { page }

  context "with default arguments" do
    before do
      render_inline(described_class.new(type: :standard)) { "Example content" }
    end

    it { is_expected.to have_css ".cads-callout", text: "Example content" }
  end

  context "when missing type" do
    before do
      without_fetch_or_fallback_raises do
        render_inline(described_class.new) { "Example content" }
      end
    end

    it { is_expected.to have_css ".cads-callout--standard" }
    it { is_expected.to have_no_css ".cads-badge" }
  end

  context "when type is example" do
    before do
      render_inline(described_class.new(type: :example)) { "Example content" }
    end

    it { is_expected.to have_css ".cads-callout--example" }
    it { is_expected.to have_css ".cads-badge", text: "Example" }
  end

  context "when type is important" do
    before do
      render_inline(described_class.new(type: :important)) { "Example content" }
    end

    it { is_expected.to have_css ".cads-callout--important" }
    it { is_expected.to have_css ".cads-badge--important", text: "Important" }
  end

  context "when type is adviser" do
    before do
      render_inline(described_class.new(type: :adviser)) { "Example content" }
    end

    it { is_expected.to have_css ".cads-callout--adviser" }
    it { is_expected.to have_css ".cads-badge--adviser", text: "Adviser" }
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

    it { is_expected.to have_css "section[aria-labelledby='my-custom-title']" }

    it { is_expected.to have_css "h2#my-custom-title", text: "Callout title" }

    it { is_expected.to have_text "Example content" }
  end

  context "when no content present" do
    before do
      render_inline(described_class.new(type: :standard))
    end

    it { is_expected.to have_no_css ".cads-callout" }
  end
end
