# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::ContactDetails, type: :component do
  subject { page }

  context "when content is present" do
    before { render_inline described_class.new.with_content("Example content") }

    it { is_expected.to have_selector ".cads-contact-details", text: "Example content" }
  end

  context "when no content present" do
    before { render_inline described_class.new }

    it { is_expected.not_to have_selector ".cads-contact-details" }
  end
end
