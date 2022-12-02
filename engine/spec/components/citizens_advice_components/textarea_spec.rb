# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Textarea, type: :component do
  subject { page }

  context "with default arguments" do
    before do
      render_inline described_class.new(
        name: "example-textarea",
        label: "Example textarea"
      )
    end

    it "links the label to the input" do
      expect(page).to have_selector "label[for=example-textarea-input]"
    end

    it "adds the correct id to the input" do
      expect(page).to have_selector "#example-textarea-input"
    end

    it "includes aria-required attribute" do
      expect(page).to have_selector "textarea[aria-required=true]"
    end

    it "does not have an aria-describedby attribute by default" do
      expect(page).to have_no_selector "textarea[aria-describedby]"
    end

    it "renders a textarea with 8 rows" do
      expect(page).to have_selector "textarea[rows=8]"
    end
  end

  context "when a value is provided" do
    before do
      render_inline described_class.new(
        name: "example-textarea",
        label: "Example textarea",
        options: { value: "Example value" }
      )
    end

    it { is_expected.to have_field "Example textarea", with: "Example value" }

    it "does not set value as attribute" do
      expect(page).to have_no_selector "textarea[value='Example value']"
    end
  end

  context "when the textarea is optional" do
    before do
      render_inline described_class.new(
        name: "example-textarea",
        label: "Example textarea",
        options: { optional: true }
      )
    end

    it { is_expected.to have_text "(optional)" }

    it "does not add required to the input" do
      expect(page).to have_no_selector "textarea[required]"
    end

    context "when in Cymraeg" do
      around { |example| I18n.with_locale(:cy) { example.run } }

      it { is_expected.to have_text "(dewisol)" }
    end
  end

  context "when an error is present" do
    before do
      render_inline described_class.new(
        name: "example-textarea",
        label: "Example textarea",
        options: { error_message: "Enter your name" }
      )
    end

    it { is_expected.to have_selector "#example-textarea-error", text: "Enter your name" }
    it { is_expected.to have_selector "textarea[aria-invalid=true]" }
    it { is_expected.to have_selector "textarea[aria-describedby=example-textarea-error]" }
  end

  context "when there is hint text" do
    before do
      render_inline described_class.new(
        name: "example-textarea",
        label: "Example textarea",
        options: { hint: "This is the hint text" }
      )
    end

    it { is_expected.to have_text "This is the hint text" }
    it { is_expected.to have_selector "textarea[aria-describedby=example-textarea-hint]" }
  end

  context "when there is hint text and an error" do
    before do
      render_inline described_class.new(
        name: "example-textarea",
        label: "Example textarea",
        options: { hint: "This is the hint text", error_message: "Enter your name" }
      )
    end

    it { is_expected.to have_selector "textarea[aria-describedby='example-textarea-error example-textarea-hint']" }
  end

  context "when a type is specified" do
    before do
      render_inline described_class.new(
        name: "example-textarea",
        label: "Example textarea",
        type: :email
      )
    end

    it "does not render the type attribute" do
      expect(page).to have_no_selector "textarea[type]"
    end
  end

  context "when additional attributes are provided" do
    before do
      render_inline described_class.new(
        name: "example-textarea",
        label: "Example textarea",
        options: { additional_attributes: { autocomplete: "name", "data-additional": "example" } }
      )
    end

    it { is_expected.to have_selector "textarea[autocomplete=name]" }
    it { is_expected.to have_selector "textarea[data-additional=example]" }
  end

  context "when a valid number of rows is specified" do
    before do
      render_inline described_class.new(
        name: "example-textarea",
        label: "Example textarea",
        rows: 10
      )
    end

    it "renders the textarea with the correct number of rows" do
      expect(page).to have_selector "textarea[rows=10]"
    end
  end

  context "when an invalid number of rows is specified" do
    before do
      render_inline described_class.new(
        name: "example-textarea",
        label: "Example textarea",
        rows: "invalid"
      )
    end

    let(:rows) { "banana" }

    it "renders the default number of rows" do
      expect(page).to have_selector "textarea[rows=8]"
    end
  end
end
