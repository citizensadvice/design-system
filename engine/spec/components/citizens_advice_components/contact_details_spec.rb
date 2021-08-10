# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::ContactDetails, type: :component do
  subject(:component) do
    render_inline(described_class.new) do
      "Example content"
    end
  end

  it "renders content block" do
    expect(component.at(".cads-contact-details").text).to include "Example content"
  end

  context "when no content present" do
    subject(:component) do
      render_inline(described_class.new)
    end

    it "does not render" do
      expect(component.at(".cads-contact-details")).not_to be_present
    end
  end
end
