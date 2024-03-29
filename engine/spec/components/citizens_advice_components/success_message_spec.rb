# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::SuccessMessage, type: :component do
  subject { page }

  context "with default arguments" do
    before do
      render_inline described_class.new(message: "Thank you for your feedback")
    end

    it { is_expected.to have_css ".cads-success-message", text: "Thank you for your feedback" }

    it { is_expected.to have_css "[aria-live=polite]" }
  end

  context "when no message present" do
    before { render_inline described_class.new(message: nil) }

    it { is_expected.to have_no_css ".cads-success-message" }
  end
end
