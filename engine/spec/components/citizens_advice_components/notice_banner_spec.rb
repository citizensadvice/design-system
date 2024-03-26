# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::NoticeBanner, type: :component do
  subject { page }

  context "with default arguments" do
    before do
      render_inline(described_class.new(label: "Example label")) do
        "Example content"
      end
    end

    it { is_expected.to have_css ".cads-notice-banner" }
    it { is_expected.to have_css "span", text: "Example label" }
    it { is_expected.to have_text "Example content" }
  end

  context "when no content present" do
    before do
      render_inline(described_class.new(label: "Example label"))
    end

    it { is_expected.to have_no_css ".cads-notice-banner" }
  end
end
