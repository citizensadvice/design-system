# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FormBuilder do
  include FormBuilderTestHelpers

  subject { page }

  let(:model) { ExampleForm.valid_example }
  let(:builder) { form_builder_for(model) }
  let(:example_options) do
    [
      FormOption.new(id: "GBP", name: "£ Pound sterling"),
      FormOption.new(id: "EUR", name: "€ Euro"),
      FormOption.new(id: "USD", name: "$ United States dollar")
    ]
  end

  describe "#cads_collection_check_boxes" do
    context "with default arguments" do
      let(:field) do
        builder.cads_collection_check_boxes(:currency, example_options, :id, :name)
      end

      before do
        render_inline field
      end

      it "renders expected number of options" do
        expect(page).to have_field("example_form[currency][]", type: :checkbox, count: 3)
      end

      it "renders expected options and values" do
        example_options.each do |option|
          expect(page).to have_css "label", text: option.name
          expect(page).to have_css "input[value='#{option.id}']"
        end
      end

      it "renders additional hidden input" do
        expect(page).to have_field("example_form[currency][]", type: :hidden, with: "", visible: :hidden)
      end

      it "renders first option with linkable id" do
        expect(page).to have_field(
          "example_form[currency][]",
          id: "example_form_currency-input",
          type: :checkbox,
          with: "GBP"
        )
      end

      it "renders remaining options with indexed IDs" do
        expect(page).to have_field(
          "example_form[currency][]",
          id: "example_form_currency-1",
          type: :checkbox,
          with: "EUR"
        )

        expect(page).to have_field(
          "example_form[currency][]",
          id: "example_form_currency-2",
          type: :checkbox,
          with: "USD"
        )
      end

      it "checks selected option" do
        expect(page).to have_field(
          "example_form[currency][]",
          type: :checkbox,
          with: "GBP",
          checked: true
        )
      end

      it "does not add required to any inputs" do
        expect(page).to have_no_css "input[required]"
      end

      it "labels the field group as optional" do
        expect(page).to have_css "legend", text: "Currency (optional)", normalize_ws: true
      end

      context "when in Cymraeg" do
        around { |example| I18n.with_locale(:cy) { example.run } }

        it "translates optional label" do
          expect(page).to have_css "legend", text: "Currency (dewisol)", normalize_ws: true
        end
      end
    end

    context "with required parameter" do
      let(:field) do
        builder.cads_collection_check_boxes(:currency, example_options, :id, :name, required: true)
      end

      it "labels the field group as required" do
        render_inline field
        expect(page).to have_css "legend", text: "Currency"
        expect(page).to have_no_text "(optional)"
      end
    end

    context "with hint text" do
      let(:field) do
        builder.cads_collection_check_boxes(:currency, example_options, :id, :name, hint: "Example hint")
      end

      before do
        render_inline field
      end

      it "includes the hint text" do
        expect(page).to have_text "Example hint"
      end

      it "sets aria-describedby" do
        expect(page).to have_css "fieldset[aria-describedby=example_form_currency-hint]"
      end
    end

    context "with 'page_heading' parameter" do
      let(:field) do
        builder.cads_collection_check_boxes(:currency, example_options, :id, :name, page_heading: true)
      end

      it "wraps the legend text in a page heading" do
        render_inline field
        expect(page).to have_css "legend h1.cads-page-title", text: "Currency"
      end
    end

    context "with validation errors" do
      let(:model) { ExampleForm.invalid_example }
      let(:field) do
        builder.cads_collection_check_boxes(:currency, example_options, :id, :name)
      end

      before do
        model.valid? # trigger validation
        render_inline field
      end

      it "renders error message" do
        expect(page).to have_text "Currency is not included in the list"

        expect(page).to have_css "#example_form_currency-error", text: "Currency is not included in the list"
      end

      it "sets aria-describedby" do
        expect(page).to have_css "fieldset[aria-describedby='example_form_currency-error']"
      end

      context "when there is hint text" do
        let(:field) do
          builder.cads_collection_check_boxes(:currency, example_options, :id, :name, hint: "Example hint")
        end

        it "sets multiple aria-describedby" do
          expect(page).to have_css "fieldset[aria-describedby='example_form_currency-error example_form_currency-hint']"
        end
      end
    end

    context "with deprecated named attributes" do
      let(:field) do
        builder.cads_collection_check_boxes(
          :currency,
          collection: example_options,
          text_method: :name,
          value_method: :id
        )
      end

      before { allow(CitizensAdviceComponents.deprecator).to receive(:warn) }

      it "logs deprecation warning" do
        render_inline field
        expect(CitizensAdviceComponents.deprecator).to have_received(:warn)
          .with(/collection, text_method, and value_method named parameters are deprecated/)
      end
    end
  end
end
