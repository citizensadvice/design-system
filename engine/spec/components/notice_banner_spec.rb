# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::NoticeBanner, type: :component do
  subject(:component) do
    render_inline(CitizensAdviceComponents::NoticeBanner.new(label: "Example label")) do
      "Example content"
    end
  end

  it "has a label" do
    expect(component.at("span").text).to include "Example label"
  end

  it "renders content block" do
    expect(component.text).to include "Example content"
  end

  context "when no content present" do
    subject(:component) do
      render_inline(CitizensAdviceComponents::NoticeBanner.new(label: "Example label"))
    end

    it "does not render" do
      expect(component.at('.cads-notice-banner')).to_not be_present
    end
  end
end
