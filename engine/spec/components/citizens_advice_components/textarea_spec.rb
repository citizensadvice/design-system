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
      expect(page).to have_css "label[for=example-textarea-input]"
    end

    it "adds the correct id to the input" do
      expect(page).to have_css "#example-textarea-input"
    end

    it "includes aria-required attribute" do
      expect(page).to have_css "textarea[aria-required=true]"
    end

    it "does not have an aria-describedby attribute by default" do
      expect(page).to have_no_css "textarea[aria-describedby]"
    end

    it "renders a textarea with 8 rows" do
      expect(page).to have_css "textarea[rows=8]"
    end
  end

  context "when an id is provided" do
    before do
      render_inline described_class.new(
        name: "example-input[test]",
        id: "test-id",
        label: "Example input",
        type: :text,
        options: { hint: "This is the hint text",
                   error_message: "Enter your name" }
      )
    end

    it "adds the correct name to the input" do
      expect(page).to have_field "Example input", name: "example-input[test]"
    end

    it "adds the correct id to the input" do
      expect(page).to have_css "#test-id-input"
    end

    it "adds the correct id to the label" do
      expect(page).to have_css "#test-id-label"
    end

    it "adds the correct id to the hint" do
      expect(page).to have_css "#test-id-hint"
    end

    it "adds the correct id to the error message" do
      expect(page).to have_css "#test-id-error"
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
      expect(page).to have_no_css "textarea[value='Example value']"
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
      expect(page).to have_no_css "textarea[required]"
    end

    context "when in Cymraeg" do
      around { |example| I18n.with_locale(:cy) { example.run } }

      it { is_expected.to have_text "(dewisol)" }
    end
  end

  context "when the input is a page heading" do
    before do
      render_inline described_class.new(
        name: "example-textarea-page-heading",
        label: "Example textarea with page heading",
        options: { page_heading: true }
      )
    end

    it { is_expected.to have_css "h1.cads-page-title label", text: "Example textarea with page heading" }
  end

  context "when an error is present" do
    before do
      render_inline described_class.new(
        name: "example-textarea",
        label: "Example textarea",
        options: { error_message: "Enter your name" }
      )
    end

    it { is_expected.to have_css "#example-textarea-error", text: "Enter your name" }
    it { is_expected.to have_css "textarea[aria-invalid=true]" }
    it { is_expected.to have_css "textarea[aria-describedby=example-textarea-error]" }
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
    it { is_expected.to have_css "textarea[aria-describedby=example-textarea-hint]" }
  end

  context "when there is hint text and an error" do
    before do
      render_inline described_class.new(
        name: "example-textarea",
        label: "Example textarea",
        options: { hint: "This is the hint text", error_message: "Enter your name" }
      )
    end

    it { is_expected.to have_css "textarea[aria-describedby='example-textarea-error example-textarea-hint']" }
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
      expect(page).to have_no_css "textarea[type]"
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

    it { is_expected.to have_css "textarea[autocomplete=name]" }
    it { is_expected.to have_css "textarea[data-additional=example]" }
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
      expect(page).to have_css "textarea[rows=10]"
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
      expect(page).to have_css "textarea[rows=8]"
    end
  end
end
