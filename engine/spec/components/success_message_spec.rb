# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::SuccessMessage, type: :component do
  subject(:component) do
    render_inline(CitizensAdviceComponents::SuccessMessage.new(message: message))
  end

  let(:message) { "Thank you for your feedback" }

  it "renders message" do
    expect(component.at(".cads-success-message").text.strip).to include message
  end

  it "renders aria-live region" do
    expect(component.at(".cads-success-message").attr("aria-live")).to eq "polite"
  end

  context "when no message present" do
    let(:message) { nil }

    it "does not render" do
      expect(component.at(".cads-success-message")).to_not be_present
    end
  end
end
