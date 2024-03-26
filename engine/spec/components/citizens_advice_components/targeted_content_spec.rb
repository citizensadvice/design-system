# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::TargetedContent, type: :component do
  subject { page }

  context "with default arguments" do
    before do
      render_inline described_class.new(
        id: "targeted-content-example",
        title: "Example title",
        type: :public
      ) do
        "Example content"
      end
    end

    it { is_expected.to have_css ".cads-targeted-content", text: "Example content" }
    it { is_expected.to have_css "h2", text: "Example title" }
    it { is_expected.to have_no_css ".cads-badge" }
  end

  context "when missing type" do
    before do
      without_fetch_or_fallback_raises do
        render_inline described_class.new(
          id: "targeted-content-example",
          title: "Example title",
          type: nil
        ) do
          "Example content"
        end
      end
    end

    it { is_expected.to have_css ".cads-targeted-content" }
    it { is_expected.to have_no_css ".cads-badge" }
  end

  context "when type is adviser" do
    before do
      render_inline described_class.new(
        id: "targeted-content-example",
        title: "Example title",
        type: :adviser
      ) do
        "Example content"
      end
    end

    it { is_expected.to have_css ".cads-targeted-content--adviser" }
    it { is_expected.to have_css ".cads-badge", text: "Adviser" }

    context "when welsh language" do
      around { |example| I18n.with_locale(:cy) { example.run } }

      it { is_expected.to have_css ".cads-badge", text: "Cynghorydd" }
    end
  end

  context "with custom heading_level" do
    before do
      render_inline described_class.new(
        id: "targeted-content-example",
        title: "Example title",
        type: :public,
        heading_level: heading_level
      ) do
        "Example content"
      end
    end

    context "with valid heading_level" do
      let(:heading_level) { 3 }

      it { is_expected.to have_css "h3", text: "Example title" }
    end

    context "with heading_level under limit" do
      let(:heading_level) { 1 }

      it "has heading clamped to minimum" do
        expect(page).to have_css "h2", text: "Example title"
      end
    end

    context "with heading_level over limit" do
      let(:heading_level) { 7 }

      it "has heading clamped to maximum" do
        expect(page).to have_css "h6", text: "Example title"
      end
    end

    context "with invalid heading_level" do
      let(:heading_level) { "not_a_heading_level" }

      it "has heading set to default" do
        expect(page).to have_css "h2", text: "Example title"
      end
    end
  end

  context "when no content present" do
    subject(:component) do
      render_inline described_class.new(
        id: "targeted-content-example",
        title: "Example title",
        type: :public
      )
    end

    it { is_expected.to have_no_css ".cads-targeted-content" }
  end
end
