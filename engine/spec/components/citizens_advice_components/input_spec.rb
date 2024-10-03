# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Input, type: :component do
  subject { page }

  context "with default arguments" do
    before do
      render_inline described_class.new(
        name: "example-input",
        label: "Example input",
        type: :text
      )
    end

    it { is_expected.to have_field "Example input", type: :text }

    it "links the label to the input" do
      expect(page).to have_css "label[for=example-input-input]"
    end

    it "adds the correct id to the input" do
      expect(page).to have_css "#example-input-input"
    end

    it "includes aria-required attribute" do
      expect(page).to have_css "input[aria-required=true]"
    end

    it "does not have an aria-describedby attribute by default" do
      expect(page).to have_no_css "input[aria-describedby]"
    end
  end

  context "when a value is provided" do
    before do
      render_inline described_class.new(
        name: "example-input",
        label: "Example input",
        type: :text,
        options: { value: "Example value" }
      )
    end

    it { is_expected.to have_field "Example input", with: "Example value" }
  end

  context "when a valid type is specified" do
    before do
      render_inline described_class.new(
        name: "example-input",
        label: "Example input",
        type: :email
      )
    end

    it { is_expected.to have_field "Example input", type: :email }
  end

  context "when an invalid type is specified" do
    before do
      without_fetch_or_fallback_raises do
        render_inline described_class.new(
          name: "example-input",
          label: "Example input",
          type: :invalid
        )
      end
    end

    it "renders a text input" do
      expect(page).to have_field "Example input", type: :text
    end
  end

  context "when the input is a page heading" do
    before do
      render_inline described_class.new(
        name: "example-input-page-heading",
        label: "Example input with page heading",
        type: :text,
        options: { page_heading: true }
      )
    end

    it { is_expected.to have_css "h1.cads-page-title", text: "Example input with page heading" }
  end

  context "when the input is optional" do
    before do
      render_inline described_class.new(
        name: "example-input",
        label: "Example input",
        type: :text,
        options: { optional: true }
      )
    end

    it { is_expected.to have_text "(optional)" }

    it "does not add aria-required to the input" do
      expect(page).to have_css "input[aria-required=false]"
    end

    context "when in Cymraeg" do
      around { |example| I18n.with_locale(:cy) { example.run } }

      it { is_expected.to have_text "(dewisol)" }
    end
  end

  context "when an error is present" do
    before do
      render_inline described_class.new(
        name: "example-input",
        label: "Example input",
        type: :text,
        options: { error_message: "Enter your name" }
      )
    end

    it { is_expected.to have_css "#example-input-error", text: "Enter your name" }
    it { is_expected.to have_css "input[aria-invalid]" }
    it { is_expected.to have_css "input[aria-describedby=example-input-error]" }
  end

  context "when there is hint text" do
    before do
      render_inline described_class.new(
        name: "example-input",
        label: "Example input",
        type: :text,
        options: { hint: "This is the hint text" }
      )
    end

    it { is_expected.to have_text "This is the hint text" }
    it { is_expected.to have_css "input[aria-describedby=example-input-hint]" }
  end

  context "when there is hint text and an error" do
    before do
      render_inline described_class.new(
        name: "example-input",
        label: "Example input",
        type: :text,
        options: { hint: "This is the hint text", error_message: "Enter your name" }
      )
    end

    it { is_expected.to have_css "input[aria-describedby='example-input-error example-input-hint']" }
  end

  context "when additional attributes are provided" do
    before do
      render_inline described_class.new(
        name: "example-input",
        label: "Example input",
        type: :text,
        options: { additional_attributes: { autocomplete: "name", "data-additional": "example" } }
      )
    end

    it { is_expected.to have_css "input[autocomplete=name]" }
    it { is_expected.to have_css "input[data-additional=example]" }
  end
end
