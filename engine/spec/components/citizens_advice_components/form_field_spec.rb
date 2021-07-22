# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FormField, type: :component do
  subject(:component) do
    render_inline(described_class.new(error: error.presence)) do
      "Fake input"
    end
  end

  let(:error) { false }

  context "when there is no error" do
    it "does not append the error class" do
      expect(component.css(".cads-form-field").attribute("class").value).not_to include("cads-form-field--has-error")
    end
  end

  context "when there is an error" do
    let(:error) do
      true
    end

    it "appends the error class" do
      expect(component.css(".cads-form-field").attribute("class").value).to include("cads-form-field--has-error")
    end
  end

  context "when there is no content" do
    subject(:component) { render_inline described_class.new(error: false) }

    it "does not render" do
      expect(component.css(".cads-form-field")).not_to be_present
    end
  end
end
