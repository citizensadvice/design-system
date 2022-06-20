# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Textarea, type: :component do
  subject(:component) do
    render_inline described_class.new(
      name: name.presence,
      label: label.presence,
      type: type.presence
    )
  end

  let(:name) { "example-input" }
  let(:label) { "Example input" }
  let(:type) { nil }

  it "renders a text area" do
    expect(component.css("textarea")).to be_present
  end

  it "renders 8 rows" do
    expect(component.css("textarea").attribute("rows").value).to eq("8")
  end

  context "when a type is specified" do
    let(:type) { :email }

    it "does not render the type attribute" do
      expect(component.css("textarea").attribute("type")).to be_nil
    end
  end

  context "when a valid number of rows is specified" do
    subject(:component) do
      render_inline described_class.new(
        name: name.presence,
        label: label.presence,
        type: type.presence,
        rows: rows.presence
      )
    end

    let(:rows) { 10 }

    it "renders the textarea with the correct number of rows" do
      expect(component.css("textarea").attribute("rows").value).to eq("10")
    end
  end

  context "when an invalid number of rows is specified" do
    subject(:component) do
      render_inline described_class.new(
        name: name.presence,
        label: label.presence,
        rows: rows.presence
      )
    end

    let(:rows) { "banana" }

    it "renders the default number of rows" do
      expect(component.css("textarea").attribute("rows").value).to eq("8")
    end
  end
end
