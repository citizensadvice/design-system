# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::SuccessMessage, type: :component do
  subject(:component) do
    rendered = render_inline(described_class.new(message: message))
    rendered.at(".cads-success-message")
  end

  let(:message) { "Thank you for your feedback" }

  it "renders message" do
    expect(component.text.strip).to include message
  end

  it "renders aria-live region" do
    expect(component.attr("aria-live")).to eq "polite"
  end

  context "when no message present" do
    let(:message) { nil }

    it "does not render" do
      expect(component).not_to be_present
    end
  end
end
