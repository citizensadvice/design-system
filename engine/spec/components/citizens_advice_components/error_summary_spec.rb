# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::ErrorSummary, type: :component do
  subject { page }

  context "when there are no errors provided" do
    before { render_inline described_class.new }

    it { is_expected.to have_no_css "cads-error-summary" }
  end

  context "when errors are provided" do
    before do
      render_inline described_class.new do |c|
        c.with_errors(sample_error_messages)
      end
    end

    it { is_expected.to have_css "h2", text: "There is a problem" }
    it { is_expected.to have_css "[autofocus=autofocus]" }
    it { is_expected.to have_css "a", count: 1 }
    it { is_expected.to have_link "Enter your full name", href: "#name-input" }
  end

  context "when custom heading_level is provided" do
    before do
      render_inline described_class.new(heading_level: 3) do |c|
        c.with_errors(sample_error_messages)
      end
    end

    it { is_expected.to have_css "h3", text: "There is a problem" }
  end

  context "when custom autofocus option is provided" do
    before do
      render_inline described_class.new(autofocus: false) do |c|
        c.with_errors(sample_error_messages)
      end
    end

    it { is_expected.to have_no_css "[autofocus=autofocus]" }
  end

  private

  def sample_error_messages
    [{
      href: "#name-input",
      message: "Enter your full name"
    }]
  end
end
