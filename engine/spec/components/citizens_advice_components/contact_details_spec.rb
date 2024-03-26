# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::ContactDetails, type: :component do
  subject { page }

  context "when content is present" do
    before { render_inline described_class.new.with_content("Example content") }

    it { is_expected.to have_css ".cads-contact-details", text: "Example content" }
  end

  context "when no content present" do
    before { render_inline described_class.new }

    it { is_expected.to have_no_css ".cads-contact-details" }
  end
end
