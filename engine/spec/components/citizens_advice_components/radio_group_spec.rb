# frozen_string_literal: true

# default behaviour - large, list, one for each option, value, checked, name, id
# optional behaviour - optional, hint, inline, small, error, layout
# invalid params - size, layout, optional

RSpec.describe CitizensAdviceComponents::RadioGroup, type: :component do
  subject(:component) do
    render_inline described_class.new(
      legend: "Radio button group field",
      name: "radio-buttons",
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

  context "when invalid size parameter is passed" do
    let(:options) { { size: :bananas } }

    it "renders a normal size input" do
      without_fetch_or_fallback_raises do
        expect(component.css(".cads-radio-group--regular")).to be_present
      end
    end
  end

  context "when invalid layout parameter is passed" do
    let(:options) { { layout: :bananas } }

    it "renders the radio buttons in list layout" do
      without_fetch_or_fallback_raises do
        expect(component.css(".cads-radio-group--list")).to be_present
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

    it "has the correct layout" do
      expect(component.css(".cads-radio-group--inline")).to be_present
    end

    it "has the correct size buttons" do
      expect(component.css(".cads-radio-group--small")).to be_present
    end
  end
end
