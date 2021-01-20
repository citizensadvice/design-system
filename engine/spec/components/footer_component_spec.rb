# frozen_string_literal: true

RSpec.describe DesignSystem::FooterComponent do
  before { I18n.locale = :en }

  subject(:component) do
    render_inline(DesignSystem::FooterComponent.new)
  end

  it "renders footer" do
    expect(component.at("footer")).to_not be_nil
  end

  context "with feedback_url" do
    subject(:component) do
      render_inline(
        DesignSystem::FooterComponent.new(feedback_url: "https://example/com")
      )
    end
  end
end
