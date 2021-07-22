# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::TextInput, type: :component do
  subject(:component) do
    render_inline described_class.new(
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

  it "renders a text input" do
    expect(component.css("input").attribute("type").value).to eq("text")
  end

  it "renders a full width version" do
    expect(component.css("input").attribute("class").value).to eq("cads-input")
  end

  context "when a valid width is specified" do
    let(:width) { :four_chars }

    it "renders the input at the correct width" do
      expect(component.css(".cads-input--four-chars")).to be_present
    end
  end

  context "when an invalid width is specified" do
    let(:width) { "banana" }

    it "renders a full width version" do
      without_fetch_or_fallback_raises do
        expect(component.css("input").attribute("class").value).to eq("cads-input")
      end
    end
  end

  context "when an invalid type is specified" do
    let(:type) { :date }

    it "renders a text input" do
      without_fetch_or_fallback_raises do
        expect(component.css("input").attribute("type").value).to eq("text")
      end
    end
  end
end
