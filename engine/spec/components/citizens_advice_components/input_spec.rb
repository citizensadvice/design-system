# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Input, type: :component do
  subject(:component) do
    render_inline described_class.new(
      name: "example-input",
      label: "Example input",
      type: type.presence,
      options: options.presence
    )
  end

  let(:type) { :text }
  let(:options) { nil }

  it "renders the label" do
    expect(component.text.strip).to include("Example input")
  end

  it "links the label to the input" do
    expect(component.css("label").attribute("for").value).to eq("example-input-input")
  end

  it "renders an input" do
    expect(component.css("input")).to be_present
  end

  it "adds the correct id to the input" do
    expect(component.css("input").attribute("id").value).to eq("example-input-input")
  end

  it "renders a text input" do
    expect(component.css("input").attribute("type").value).to eq("text")
  end

  it "renders an empty input" do
    expect(component.css("input").attribute("value")).to be_nil
  end

  it "renders a required input" do
    expect(component.css("input").attribute("required")).to be_present
  end

  context "when a value is provided" do
    let(:options) { { value: "This is the value of the field" } }

    it "renders the value" do
      expect(component.css("input").attribute("value").value).to eq "This is the value of the field"
    end
  end

  context "when an error is present" do
    subject(:component) do
      render_inline described_class.new(
        name: "example-input",
        label: "Example input",
        type: :text,
        options: {
          error_message: "Enter your name"
        }
      )
    end

    let(:error_message) { "Enter your name" }

    it "renders the error message" do
      expect(component.text.strip).to include "Enter your name"
    end

    it "adds aria-invalid to the input" do
      expect(component.css("input").attribute("aria-invalid")).to be_present
    end

    it "adds aria-describedby to the input" do
      expect(component.css("input").attribute("aria-describedby").value).to eq("example-input-error")
    end
  end

  context "when a type is specified" do
    let(:type) { :email }

    it "renders the correct type of input" do
      expect(component.css("input").attribute("type").value).to eq("email")
    end
  end

  context "when the input is optional" do
    let(:options) { { optional: true } }

    it "adds optional to the label" do
      expect(component.text).to include("(optional)")
    end

    it "does not add required to the input" do
      expect(component.css("input").attribute("required")).not_to be_present
    end

    context "when in Cymraeg" do
      before do
        I18n.locale = :cy
      end

      it "renders optional in Welsh" do
        expect(component.text).to include("dewisol")
      end
    end
  end

  context "when there is hint text" do
    let(:options) { { hint: "This is the hint text" } }

    it "renders the hint text" do
      expect(component.text.strip).to include("This is the hint text")
    end

    it "adds aria-describedby to the input" do
      expect(component.css("input").attribute("aria-describedby").value).to eq("example-input-hint")
    end
  end

  context "when there is no hint text and no error" do

    it "should not have an aria-describedby attribute" do
      expect(component.css("input").attribute("aria-describedby")).not_to be_present
    end
  end

  context "when there is hint text and an error" do
    let(:options) { { hint: "this is the hint text", error_message: "Enter your name" } }

    it "adds aria-describedby to the input" do
      expect(component.css("input").attribute("aria-describedby").value).to eq("example-input-error example-input-hint")
    end
  end

  context "when additional attributes are specified" do
    let(:options) do
      { additional_attributes: { autocomplete: "name", "data-foo": "bar" } }
    end

    it "adds autocomplete attribute" do
      expect(component.css("input").attribute("autocomplete").value).to eq("name")
    end

    it "adds custom data attribute" do
      expect(component.css("input").attribute("data-foo").value).to eq("bar")
    end
  end
end
