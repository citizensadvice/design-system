# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FormBuilder do
  include FormBuilderTestHelpers

  subject { page }

  let(:model) { ExampleForm.valid_example }
  let(:builder) { form_builder_for(model) }
  let(:example_options) do
    [
      FormOption.new(id: "GBP", name: "GBP"),
      FormOption.new(id: "EUR", name: "EUR"),
      FormOption.new(id: "USD", name: "USD")
    ]
  end

  describe "#cads_collection_check_boxes" do
    context "with default arguments" do
      before do
        render_inline builder.cads_collection_check_boxes(
          :currency,
          collection: example_options,
          text_method: :name,
          value_method: :id
        )
      end

      it "renders all expected options" do
        expect(page).to have_field("example_form[currency][]", type: :checkbox, count: 3)
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
      before do
        render_inline builder.cads_collection_check_boxes(
          :currency,
          collection: example_options,
          text_method: :name,
          value_method: :id,
          required: true
        )
      end

      it "labels the field group as required" do
        expect(page).to have_css "legend", text: "Currency"
        expect(page).to have_no_text "(optional)"
      end
    end

    context "with hint text" do
      before do
        render_inline builder.cads_collection_check_boxes(
          :currency,
          collection: example_options,
          text_method: :name,
          value_method: :id,
          hint: "Example hint"
        )
      end

      it "includes the hint text" do
        expect(page).to have_text "Example hint"
      end

      it "sets aria-describedby" do
        expect(page).to have_css "fieldset[aria-describedby=example_form_currency-hint]"
      end
    end

    describe "with 'page_heading' parameter" do
      before do
        render_inline builder.cads_collection_check_boxes(
          :currency,
          collection: example_options,
          text_method: :name,
          value_method: :id,
          page_heading: true
        )
      end

      it "wraps the legend text in a page heading" do
        expect(page).to have_css "legend h1.cads-page-title", text: "Currency"
      end
    end

    context "with validation errors" do
      let(:model) { ExampleForm.invalid_example }
      let(:builder_method) do
        builder.cads_collection_check_boxes(
          :currency,
          collection: example_options,
          text_method: :name,
          value_method: :id
        )
      end

      before do
        model.valid? # trigger validation
        render_inline builder_method
      end

      it "renders error message" do
        expect(page).to have_css "#example_form_currency-error", text: "Currency is not included in the list"
      end

      it "sets aria-describedby" do
        expect(page).to have_css "fieldset[aria-describedby='example_form_currency-error']"
      end

      context "when there is hint text" do
        let(:builder_method) do
          builder.cads_collection_check_boxes(
            :currency,
            collection: example_options,
            text_method: :name,
            value_method: :id,
            hint: "Example hint"
          )
        end

        it "sets multiple aria-describedby" do
          expect(page).to have_css "fieldset[aria-describedby='example_form_currency-error example_form_currency-hint']"
        end
      end
    end
  end
end
