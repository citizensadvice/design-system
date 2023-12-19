# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::RadioGroup, type: :component do
  subject { page }

  context "when default arguments are provided" do
    before do
      render_inline described_class.new(
        legend: "Radio button group field",
        name: "radio-group"
      ) do |c|
        c.with_inputs(sample_inputs)
      end
    end

    it { is_expected.to have_field "Option 1", with: "1" }
    it { is_expected.to have_field "Option 2", with: "2" }

    it "has the expected number of options" do
      expect(page).to have_field "radio-group", count: 2
    end

    it "has no checked inputs by default" do
      expect(page).not_to have_selector "input[checked]"
    end

    it "constructs the ids of the inputs correctly" do
      expect(page).to have_selector "#radio-group-1"
    end

    it "associates the labels with the inputs correctly" do
      expect(page).to have_selector "label[for=radio-group-1]"
    end
  end

  context "when custom ids are provided" do
    before do
      render_inline described_class.new(
        legend: "Radio button group field",
        name: "radio-group[test][]"
      ) do |c|
        c.with_inputs(sample_inputs_with_id)
      end
    end

    it "adds the correct name to the input" do
      expect(page).to have_field "Option 1", name: "radio-group[test][]"
    end

    it "adds the correct id to the input" do
      expect(page).to have_selector "#test-id-first-0"
    end
  end

  context "when there are no options" do
    before do
      render_inline described_class.new(
        legend: "Radio button group field",
        name: "radio-group"
      )
    end

    it { is_expected.not_to have_selector ".cads-form-field" }
  end

  context "when an error message is provided" do
    before do
      render_inline described_class.new(
        legend: "Radio group field",
        name: "radio-group",
        options: { error_message: "This is the error message" }
      ) do |c|
        c.with_inputs(sample_inputs)
      end
    end

    it { is_expected.to have_selector ".cads-form-field--has-error" }
    it { is_expected.to have_text "This is the error message" }
  end

  context "when an hint text is provided" do
    before do
      render_inline described_class.new(
        legend: "Radio group field",
        name: "radio-group",
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
        legend: "Radio group field",
        name: "radio-group",
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

  describe "layout options" do
    context "when an invalid layout option is passed" do
      before do
        without_fetch_or_fallback_raises do
          render_inline described_class.new(
            legend: "Radio group field",
            name: "radio-group",
            options: { layout: :invalid }
          ) do |c|
            c.with_inputs(sample_inputs)
          end
        end
      end

      it "renders the radio group in list layout" do
        expect(page).to have_selector ".cads-radio-group--list"
      end
    end

    context "when the list layout option is passed" do
      before do
        render_inline described_class.new(
          legend: "Radio group field",
          name: "radio-group",
          options: { layout: :list }
        ) do |c|
          c.with_inputs(sample_inputs)
        end
      end

      it "renders the radio group in list layout" do
        expect(page).to have_selector ".cads-radio-group--list"
      end
    end

    context "when the inline layout option is passed" do
      before do
        render_inline described_class.new(
          legend: "Radio group field",
          name: "radio-group",
          options: { layout: :inline }
        ) do |c|
          c.with_inputs(sample_inputs)
        end
      end

      it "renders the radio group in list layout" do
        expect(page).to have_selector ".cads-radio-group--inline"
      end
    end
  end

  describe "size options" do
    context "when an invalid size option is passed" do
      before do
        without_fetch_or_fallback_raises do
          render_inline described_class.new(
            legend: "Radio group field",
            name: "radio-group",
            options: { size: :invalid }
          ) do |c|
            c.with_inputs(sample_inputs)
          end
        end
      end

      it "renders the regular size radio group" do
        expect(page).to have_selector ".cads-radio-group--regular"
      end
    end

    context "when the regular size option is passed" do
      before do
        render_inline described_class.new(
          legend: "Radio group field",
          name: "radio-group",
          options: { size: :regular }
        ) do |c|
          c.with_inputs(sample_inputs)
        end
      end

      it "renders the regular size radio group" do
        expect(page).to have_selector ".cads-radio-group--regular"
      end
    end

    context "when the inline layout option is passed" do
      before do
        render_inline described_class.new(
          legend: "Radio group field",
          name: "radio-group",
          options: { size: :small }
        ) do |c|
          c.with_inputs(sample_inputs)
        end
      end

      it "renders the small size radio group" do
        expect(page).to have_selector ".cads-radio-group--small"
      end
    end
  end

  private

  def sample_inputs
    [
      { label: "Option 1", value: "1", name: "radio-group" },
      { label: "Option 2", value: "2", name: "radio-group" }
    ]
  end

  def sample_inputs_with_id
    [
      { label: "Option 1", value: "1", id: "test-id-first" },
      { label: "Option 2", value: "2", id: "test-id-second" }
    ]
  end
end
