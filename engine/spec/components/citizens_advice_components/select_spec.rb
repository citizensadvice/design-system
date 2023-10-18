# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Select, type: :component do
  subject { page }

  let(:select_options) do
    [
      ["Casebook", "casebook"],
      ["Content platform", "content-platform"],
      ["SMT", "smart-meter-tool"],
      ["Find your local Citizens Advice", "fycla"]
    ]
  end
  let(:name) { "example-input" }
  let(:label) { "Example input" }
  let(:options) { {} }

  before do
    render_inline described_class.new(
      select_options: select_options,
      name: name.presence,
      label: label.presence,
      type: nil,
      options: options
    )
  end

  context "with default arguments" do
    it "links the label to the select" do
      expect(page).to have_selector "label[for=example-input-input]"
    end

    it "adds the correct id to the select" do
      expect(page).to have_selector "#example-input-input"
    end

    it "includes aria-required attribute" do
      expect(page).to have_selector "select[aria-required]"
    end

    it "does not have an aria-describedby attribute by default" do
      expect(page).not_to have_selector "select[aria-describedby]"
    end
  end

  context "when a value is provided" do
    let(:options) { { value: "fycla" } }

    it { is_expected.to have_field "Example input", with: "fycla" }
  end

  context "when the select is optional" do
    let(:options) { { optional: true } }

    it { is_expected.to have_text "(optional)" }

    it "does not add required to the input" do
      expect(page).not_to have_selector "select[required]"
    end
  end

  context "when an error is present" do
    let(:options) { { error_message: "Enter your name" } }

    it { is_expected.to have_selector "#example-input-error", text: "Enter your name" }
    it { is_expected.to have_selector "select[aria-invalid]" }
    it { is_expected.to have_selector "select[aria-describedby=example-input-error]" }
  end

  context "when there is hint text" do
    let(:options) { { hint: "This is the hint text" } }

    it { is_expected.to have_text "This is the hint text" }
    it { is_expected.to have_selector "select[aria-describedby=example-input-hint]" }
  end

  context "when there is hint text and an error" do
    let(:options) { { hint: "This is the hint text", error_message: "Enter your name" } }

    it { is_expected.to have_selector "select[aria-describedby='example-input-error example-input-hint']" }
  end

  context "when additional attributes are provided" do
    let(:options) { { additional_attributes: { autocomplete: "name", "data-additional": "example" } } }

    it { is_expected.to have_selector "select[autocomplete=name]" }
    it { is_expected.to have_selector "select[data-additional=example]" }
  end
end
