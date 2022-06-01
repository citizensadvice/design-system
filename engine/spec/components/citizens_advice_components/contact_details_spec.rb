# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::ContactDetails, type: :component do
  context "when content is present" do
    subject(:component) { described_class.new.with_content("Example content") }

    it "renders content block" do
      render_inline component
      expect(rendered_content).to have_selector ".cads-contact-details", text: "Example content"
    end
  end

  context "when no content present" do
    subject(:component) { described_class.new }

    it "does not render" do
      render_inline component
      expect(rendered_content).to have_no_selector ".cads-contact-details"
    end
  end
end
