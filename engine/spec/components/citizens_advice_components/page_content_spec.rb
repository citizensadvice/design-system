# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::PageContent, type: :component do
  subject { page }

  let(:component) { described_class.new }

  context "when main content only" do
    before do
      render_inline(component) { |c| c.with_main { "Main content" } }
    end

    it { is_expected.to have_text "Main content" }
    it { is_expected.to have_no_css ".cads-grid-col-md-4" }

    context "when full width" do
      before do
        render_inline(described_class.new(full_width: true)) { |c| c.with_main { "Main content" } }
      end

      it { is_expected.to have_css ".cads-grid-col-md-12", text: "Main content" }
    end
  end

  context "with sidebar" do
    before do
      render_inline(component) do |c|
        c.with_main { "Main content" }
        c.with_sidebar { "Sidebar content" }
      end
    end

    it { is_expected.to have_text "Main content" }
    it { is_expected.to have_css ".cads-grid-col-md-4", text: "Sidebar content" }
  end
end
