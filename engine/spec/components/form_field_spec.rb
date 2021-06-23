# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FormField, type: :component do
  let(:subject) do
    render_inline CitizensAdviceComponents::FormField.new(
     error: error.presence
    )
  end

  let(:error) { false }

  context "when there is no error" do
    it "does not append the error class" do 
      expect(subject.css(".cads-form-field").attribute("class").value).to_not include("cads-form-field--has-error")
    end
  end

  context "when there is an error" do

    let(:error) { true 
    }
    it "appends the error class" do 
      expect(subject.css(".cads-form-field").attribute("class").value).to include("cads-form-field--has-error")
    end
  end
end