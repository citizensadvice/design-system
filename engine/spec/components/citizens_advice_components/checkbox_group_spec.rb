# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::CheckboxGroup, type: :component do
  subject(:component) do
    render_inline described_class.new(
      legend: "Checkbox group field",
      name: "checkboxes",
      options: options.presence
    ) do |c|
      c.inputs(inputs)
    end
  end

  let(:inputs) do
    [
      { label: "Option 1", value: "1", name: "radio-group" },
      { label: "Option 2", value: "2", name: "radio-group" }
    ]
  end
  let(:options) { nil }

  it "renders a checkbox for each input" do
    expect(component.css("input[type='checkbox']").length).to eq(2)
  end

  it "renders the labels for the checkboxes" do
    expect(component.text).to include("Option 1", "Option 2")
  end

  it "does not check any options by default" do
    expect(component.css("input[checked]")).to be_empty
  end

  it "renders the legend" do
    expect(component.css("legend").text.strip).to eq "Checkbox group field"
  end

  it "adds the values to the correct inputs" do
    expect(component.css("input[value=1] + label").text.strip).to eq "Option 1"
  end

  it "constructs the ids of the inputs correctly" do
    expect(component.css("input[value=1]").attribute("id").value).to eq "checkboxes-0"
    expect(component.css("input[value=2]").attribute("id").value).to eq "checkboxes-1"
  end

  it "associates the labels with the inputs correctly" do
    expect(component.css("input[id='checkboxes-1'] + label").attribute("for").value).to eq "checkboxes-1"
  end

  context "when there are no checkboxes" do
    subject(:component) do
      render_inline described_class.new(
        legend: legend.presence,
        name: "checkboxes"
      ) do |c|
        c.inputs(nil)
      end
    end

    let(:legend) { "Checkbox group field" }

    it "does not render" do
      expect(component.css(".cads-form-field")).not_to be_present
    end
  end

  context "when invalid optional parameter is passed" do
    let(:options) { { optional: "bananas" } }

    it "renders a required input" do
      without_fetch_or_fallback_raises do
        expect(component.text.strip).not_to include "optional"
      end
    end
  end

  context "when there are optional parameters" do
    let(:options) do
      {
        error_message: "This is the error message",
        optional: true,
        hint: "This is the hint text",
        layout: :inline,
        size: :small
      }
    end

    it "renders the error message" do
      expect(component.text.strip).to include "This is the error message"
    end

    it "renders the hint text" do
      expect(component.text.strip).to include "This is the hint text"
    end

    it "marks the field as optional" do
      expect(component.text.strip).to include "optional"
    end

    context "when in Cymraeg" do
      before do
        I18n.locale = :cy
      end

      it "renders optional in Welsh" do
        expect(component.text).to include "dewisol"
      end
    end
  end

  context "when there are additional parameters on the radio buttons" do
    let(:inputs) do
      [
        { label: "Option 1", value: "1", name: "radio-group", "data-jackie": "weaver", "data-fruit": "bananas" }
      ]
    end

    it "adds data-jackie attribute" do
      expect(component.css("input").attribute("data-jackie").value).to eq "weaver"
    end

    it "adds data-fruit attribute" do
      expect(component.css("input").attribute("data-fruit").value).to eq "bananas"
    end
  end
end
