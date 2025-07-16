# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::CheckboxGroup, type: :component do
  subject { page }

  context "when default arguments are provided" do
    before do
      render_inline described_class.new(
        legend: "Checkbox group field",
        name: "checkboxes"
      ) do |c|
        c.with_inputs(sample_inputs)
      end
    end

    it { is_expected.to have_field "Option 1", with: "1" }
    it { is_expected.to have_field "Option 2", with: "2" }

    it "has the expected number of checkboxes" do
      expect(page).to have_field "checkbox-group", count: 2
    end

    it "has no checked inputs by default" do
      expect(page).to have_no_css "input[checked]"
    end

    it "constructs the ids of the inputs correctly" do
      expect(page).to have_css "#checkboxes-1"
    end

    it "associates the labels with the inputs correctly" do
      expect(page).to have_css "label[for=checkboxes-1]"
    end
  end

  context "when custom ids are provided" do
    before do
      render_inline described_class.new(
        legend: "Checkbox group field",
        name: "checkboxes",
        id: "test-id"
      ) do |c|
        c.with_inputs(sample_inputs)
      end
    end

    it "adds the correct name to the input" do
      expect(page).to have_field "Option 1", name: "checkbox-group"
    end

    it "adds the correct id to the input" do
      expect(page).to have_css "#test-id-0"
    end
  end

  context "when there are no options" do
    before do
      render_inline described_class.new(
        legend: "Checkbox group field",
        name: "checkboxes"
      )
    end

    it { is_expected.to have_no_css ".cads-form-field" }
  end

  context "when invalid optional parameter is passed" do
    before do
      render_inline described_class.new(
        legend: "Checkbox group field",
        name: "checkboxes",
        options: { optional: "bananas" }
      ) do |c|
        c.with_inputs(sample_inputs)
      end
    end

    it { is_expected.to have_no_text "(optional}" }
  end

  context "when an error message is provided" do
    before do
      render_inline described_class.new(
        legend: "Checkbox group field",
        name: "checkboxes",
        options: { error_message: "This is the error message" }
      ) do |c|
        c.with_inputs(sample_inputs)
      end
    end

    it { is_expected.to have_css ".cads-form-field--has-error" }
    it { is_expected.to have_text "This is the error message" }
    it { is_expected.to have_css "[aria-describedby='checkboxes-error']" }
    it { is_expected.to have_css "#checkboxes-error" }
    it { is_expected.to have_css "input[aria-invalid]", count: 2 }
  end

  context "when an hint text is provided" do
    before do
      render_inline described_class.new(
        legend: "Checkbox group field",
        name: "checkboxes",
        options: { hint: "This is the hint text" }
      ) do |c|
        c.with_inputs(sample_inputs)
      end
    end

    it { is_expected.to have_text "This is the hint text" }
  end

  context "when field is marked as optional" do
    before do
      render_inline described_class.new(
        legend: "Checkbox group field",
        name: "checkboxes",
        options: { optional: true }
      ) do |c|
        c.with_inputs(sample_inputs)
      end
    end

    it { is_expected.to have_text "(optional)" }

    context "when in Cymraeg" do
      around { |example| I18n.with_locale(:cy) { example.run } }

      it { is_expected.to have_text "(dewisol)" }
    end
  end

  context "when there are additional parameters on the inputs" do
    before do
      render_inline described_class.new(
        legend: "Checkbox group field",
        name: "checkboxes"
      ) do |c|
        c.with_inputs([
          { label: "Option 1", value: "1", name: "checkbox-1", "data-additional": "example" }
        ])
      end
    end

    it { is_expected.to have_css "[data-additional=example]" }
  end

  context "when the page heading option is passed" do
    before do
      render_inline described_class.new(
        legend: "Checkbox group field",
        name: "checkboxes",
        options: { page_heading: true }
      ) do |c|
        c.with_inputs(sample_inputs)
      end
    end

    it { is_expected.to have_css "legend h1.cads-page-title", text: "Checkbox group field" }
  end

  context "when deprecated legend_heading option is provided" do
    before do
      allow(CitizensAdviceComponents.deprecator).to receive(:warn)

      render_inline described_class.new(
        legend: "Checkbox group field",
        name: "checkboxes",
        options: { legend_heading: true }
      ) do |c|
        c.with_inputs(sample_inputs)
      end
    end

    it "logs deprecation warning" do
      expect(CitizensAdviceComponents.deprecator).to have_received(:warn)
        .with(/legend_heading option is deprecated/)
    end
  end

  private

  def sample_inputs
    [
      { label: "Option 1", value: "1", name: "checkbox-group" },
      { label: "Option 2", value: "2", name: "checkbox-group" }
    ]
  end
end
