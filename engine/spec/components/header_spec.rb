# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Header, type: :component do
  context "with no slots" do
    subject(:component) do
      render_inline(described_class.new)
    end

    it "does not render" do
      expect(component.at("header")).not_to be_present
    end
  end
end
