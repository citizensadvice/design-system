# frozen_string_literal: true

# default behaviour - large, list, one for each option, value, checked, name, id
# optional behaviour - optional, hint, inline, small, error, layout
# invalid params - size, layout, optional

RSpec.describe CitizensAdviceComponents::RadioGroup, type: :component do
  let(:radios) do
    [
      { label: "Option 1", value: "1", name: "radio-group" },
      { label: "Option 2", value: "2", name: "radio-group" }
    ]
  end

  let(:subject) do
    render_inline CitizensAdviceComponents::RadioGroup.new(
      legend: legend.presence,
      name: name.presence
    ) do |c|
      c.radio_buttons(radios)
    end
  end

  let(:name) { "radio-buttons" }
  let(:legend) { "Radio button group field" }

  it "renders a radio button for each radio" do
    expect(subject.css("input[type='radio']").length).to eq(2)
  end

  it "renders the labels for the radio buttons" do
    expect(subject.text).to include("Option 1")
    expect(subject.text).to include("Option 2")
  end

  it "does not check any options by default" do
    expect(subject.css("input[checked]")).to be_empty
  end

  it "renders the legend" do
    expect(subject.css("legend").text.strip).to eq "Radio button group field"
  end

  it "adds the values to the correct inputs" do
    expect(subject.css("input[value=1] + label").text.strip).to eq "Option 1"
  end

  it "associates the labels with the inputs correctly" do
    expect(subject.css("input[id='radio-buttons-1'] + label").attribute("for").value).to eq "radio-buttons-1"
  end

  context "when there are no radio buttons" do
    let(:subject) do
      render_inline CitizensAdviceComponents::RadioGroup.new(
        legend: legend.presence,
        name: name.presence
      ) do |c|
        c.radio_buttons(nil)
      end
    end

    let(:name) { "radio-buttons" }
    let(:legend) { "Radio button group field" }

    it "does not render" do
      expect(subject.css(".cads-form-field")).to_not be_present
    end
  end

  context "when there are optional parameters" do
    let(:subject) do
      render_inline CitizensAdviceComponents::RadioGroup.new(
        legend: legend.presence,
        name: name.presence,
        options: {
          error_message: error_message.presence,
          optional: optional.presence,
          hint: hint.presence,
          size: :small,
          layout: :inline
        }
      ) do |c|
        c.radio_buttons(radios)
      end
    end

    let(:name) { "radio-buttons" }
    let(:legend) { "Radio button group field" }
    let(:error_message) { "This is the error message" }
    let(:optional) { true }
    let(:hint) { "This is the hint text" }
    let(:layout) { :inline }
    let(:size) { :small }

    it "renders the error message" do
      expect(subject.text.strip).to include "This is the error message"
    end

    it "renders the hint text" do
      expect(subject.text.strip).to include "This is the hint text"
    end

    it "marks the field as optional" do
      expect(subject.text.strip).to include "optional"
    end

    it "has the correct layout" do
      expect(subject.css(".cads-radio-group--inline")).to be_present
    end

    it "has the correct size buttons" do
      expect(subject.css(".cads-radio-group--small")).to be_present
    end

    context "when in Cymraeg" do
      before do
        I18n.locale = :cy
      end

      it "renders optional in Welsh" do
        expect(subject.text).to include "dewisol"
      end
    end

    context "when invalid optional parameter is passed" do
      let(:optional) { "bananas" }

      it "renders a required input" do
        without_fetch_or_fallback_raises do
          expect(subject.text.strip).to_not include "Optional"
        end
      end
    end

    context "when invalid size parameter is passed" do
      let(:size) { :bananas }

      it "renders a normal size input" do
        without_fetch_or_fallback_raises do
          expect(subject.css(".cads-from-group--small")).to_not be_present
        end
      end
    end

    context "when invalid layout parameter is passed" do
      let(:layout) { :bananas }

      it "renders the radio buttons in list layout" do
        without_fetch_or_fallback_raises do
          expect(subject.css(".cads-from-group--inline")).to_not be_present
        end
      end
    end
  end

  context "when there are additional parameters on the radio buttons" do
    let(:radios) do
      [
        { label: "Option 1", value: "1", name: "radio-group", "data-jackie": "weaver", "data-fruit": "bananas" }
      ]
    end

    it "adds the attributes to the radio buttons" do
      expect(subject.css("input").attribute("data-jackie").value).to eq "weaver"
      expect(subject.css("input").attribute("data-fruit").value).to eq "bananas"
    end
  end
end
