# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::TextInput, type: :component do
  let(:subject) do
    render_inline CitizensAdviceComponents::TextInput.new(
      name: name.presence,
      label: label.presence,
      type: type.presence,
      width: width.presence
    )
  end

  let(:name) { "example-input" }
  let(:label) { "Example input" }
  let(:type) { :text }
  let(:width) { nil }


  RSpec.shared_examples "text input" do
    it "renders a text input" do
      expect(subject.css("input").attribute("type").value).to eq("text")
    end

    it "renders a full width version" do
      expect(subject.css("input").attribute("class").value).to eq("cads-input")
    end
  end

  context "by default" do
    it_behaves_like "text input"
  end


  context "when a valid width is specified" do
    let(:width) { :four_chars }

    it "renders the input at the correct width" do
      expect(subject.css(".cads-input--four-chars")).to be_present
    end
  end

  context "when an invalid width is specified" do
    let(:width) { "banana" }

    context "production rails env" do
      before do
        allow(Rails.env).to receive(:production?).and_return(true)
      end

      it_behaves_like "text input"

    end
  end


  context "when an invalid type is specified" do 
    let(:type) { :date }
    
    context "production rails env" do
      before do
        allow(Rails.env).to receive(:production?).and_return(true)
      end

      it_behaves_like "text input"

    end
  end
end
