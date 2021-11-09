# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::CheckboxSingle, type: :component do
  subject(:component) do
    render_inline described_class.new(
      name: name.presence,
      error_message: error_message.presence
    ) do |c|
      c.checkbox(checkbox)
    end
  end

  let(:checkbox) do
    { label: "Option 1", value: "1" }
  end

  let(:name) { "my-checkbox" }
  let(:error_message) { nil }

  it "renders a single checkbox" do
    expect(component.css("input[type='checkbox']").length).to eq(1)
  end

  it "renders the labels for the checkbox" do
    expect(component.text).to include("Option 1")
  end

  it "does not check any options by default" do
    expect(component.css("input[checked]")).to be_empty
  end

  it "adds the values to the correct inputs" do
    expect(component.css("input[value=1] + label").text.strip).to eq "Option 1"
  end

  it "associates the labels with the inputs correctly" do
    expect(component.css("input[id='my-checkbox-1'] + label").attribute("for").value).to eq "my-checkbox-1"
  end

  context "when there are no checkboxes" do
    subject(:component) do
      render_inline described_class.new(name: "checkboxes")
    end

    it "does not render" do
      expect(component.children).to be_empty
    end
  end

  context "when there is an error message" do
    let(:error_message) { "This is the error message" }

    it "renders the error message" do
      expect(component.text.strip).to include "This is the error message"
    end

    it "adds an aria-invalid attribute to the input" do
      expect(component.css("input[aria-invalid]").length).to eq(1)
    end

    it "links the error message to the input" do
      expect(component.css("input").attribute("aria-describedby").value).to eq("my-checkbox-error")
    end

    it "gives an id to the error message" do
      expect(component.css("[id=my-checkbox-error]")).to be_present
    end
  end

  context "when there are additional parameters on the radio buttons" do
    let(:checkbox) do
      { label: "Option 1", value: "1", "data-jackie": "weaver", "data-fruit": "bananas" }
    end

    it "adds data-jackie attribute" do
      expect(component.css("input").attribute("data-jackie").value).to eq "weaver"
    end

    it "adds data-fruit attribute" do
      expect(component.css("input").attribute("data-fruit").value).to eq "bananas"
    end
  end
end
