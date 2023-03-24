# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Callout, type: :component do
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

  context "when title is provided" do
    before do
      render_inline(described_class.new(
                      type: :adviser,
                      title: "Descriptive title"
                    )) { "Example content" }
    end

    it { is_expected.to have_selector "section[aria-label='Descriptive title']" }
  end

  context "when no content present" do
    before do
      render_inline(described_class.new(type: :standard))
    end

    it { is_expected.not_to have_selector ".cads-callout" }
  end
end
