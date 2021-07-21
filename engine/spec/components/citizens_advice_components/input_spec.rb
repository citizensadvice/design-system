# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Input, type: :component do
  let(:subject) do
    render_inline described_class.new(
      name: name.presence,
      label: label.presence,
      type: type.presence,
      options: {
        error_message: error_message.presence,
        optional: optional.presence,
        hint: hint.presence,
        additional_attributes: additional_attributes.presence
      }
    )
  end

  let(:name) { "example-input" }
  let(:label) { "Example input" }
  let(:type) { :text }
  let(:error_message) { nil }
  let(:optional) { false }
  let(:hint) { nil }
  let(:additional_attributes) { nil }

  context "by default" do
    it "renders the label" do
      expect(subject.text.strip).to include("Example input")
    end

    it "links the label to the input" do
      expect(subject.css("label").attribute("for").value).to eq("example-input-input")
    end

    it "renders an input" do
      expect(subject.css("input")).to be_present
    end

    it "adds the correct id to the input" do
      expect(subject.css("input").attribute("id").value).to eq("example-input-input")
    end

    it "renders a text input" do
      expect(subject.css("input").attribute("type").value).to eq("text")
    end

    it "renders an empty input" do
      expect(subject.css("input").attribute("value")).to eq nil
    end

    it "renders a required input" do
      expect(subject.css("input").attribute("required")).to be_present
    end
  end

  context "when an error is present" do
    let(:error_message) { "Enter your name" }

    it "renders the error message" do
      expect(subject.text.strip).to include "Enter your name"
    end

    it "adds aria-invalid to the input" do
      expect(subject.css("input").attribute("aria-invalid")).to be_present
    end

    it "adds aria-describedby to the input" do
      expect(subject.css("input").attribute("aria-describedby").value).to eq("example-input-error")
    end
  end

  context "when the input is optional" do
    let(:optional) { true }

    it "adds optional to the label" do
      expect(subject.text).to include("optional")
    end

    it "does not add required to the input" do
      expect(subject.css("input").attribute("required")).not_to be_present
    end

    context "when in Cymraeg" do
      before do
        I18n.locale = :cy
      end

      it "renders optional in Welsh" do
        expect(subject.text).to include("dewisol")
      end
    end
  end

  context "when there is hint text" do
    let(:hint) { "This is the hint text" }

    it "renders the hint text" do
      expect(subject.text.strip).to include("This is the hint text")
    end
  end

  context "when a type is specified" do
    let(:type) { :email }

    it "renders the correct type of input" do
      expect(subject.css("input").attribute("type").value).to eq("email")
    end
  end

  context "when additional attributes are specified" do
    let(:additional_attributes) do
      {
        autocomplete: "name",
        "data-foo": "bar"
      }
    end

    it "adds the attributes to the input" do
      expect(subject.css("input").attribute("autocomplete").value).to eq("name")
      expect(subject.css("input").attribute("data-foo").value).to eq("bar")
    end
  end
end
