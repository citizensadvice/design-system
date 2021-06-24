# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FormField, type: :component do
  let(:subject) do
    render_inline(CitizensAdviceComponents::FormField.new(error: error.presence)) do
      "Fake input"
    end
  end

  let(:error) { false }

  context "when there is no error" do
    it "does not append the error class" do
      expect(subject.css(".cads-form-field").attribute("class").value).to_not include("cads-form-field--has-error")
    end
  end

  context "when there is an error" do
    let(:error) do
      true
    end
    it "appends the error class" do
      expect(subject.css(".cads-form-field").attribute("class").value).to include("cads-form-field--has-error")
    end
  end

  context "when there is no content" do
    let(:subject) { render_inline CitizensAdviceComponents::FormField.new(error: false) }

    it "does not render" do
      expect(subject.css(".cads-form-field")).to_not be_present
    end
  end
end
