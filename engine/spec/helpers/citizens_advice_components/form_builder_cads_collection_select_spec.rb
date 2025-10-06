# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FormBuilder do
  include FormBuilderTestHelpers

  subject { page }

  let(:model) { ExampleForm.valid_example }
  let(:builder) { form_builder_for(model) }

  describe "#cads_collection_select" do
    context "with default arguments" do
      before do
        render_inline builder.cads_collection_select(
          :currency,
          collection: [%w[GBP GBP], %w[EUR EUR], %w[USD USD]],
          text_method: :first,
          value_method: :last
        )
      end

      it "renders select field with value" do
        expect(page).to have_select("example_form[currency]", selected: "GBP")
      end

      it "links the label to the input" do
        expect(page).to have_css "label[for=example_form_currency-input]"
      end

      it "adds the correct id to the input" do
        expect(page).to have_css "#example_form_currency-input"
      end

      it "does not have an aria-describedby attribute by default" do
        expect(page).to have_no_css "select[aria-describedby]"
      end

      it "does not add required to the input" do
        expect(page).to have_no_css "select[required]"
      end

      it "labels the field as optional" do
        expect(page).to have_text "Currency (optional)", normalize_ws: true
      end

      context "when in Cymraeg" do
        around { |example| I18n.with_locale(:cy) { example.run } }

        it { is_expected.to have_text "(dewisol)" }
      end
    end

    context "with required parameter" do
      before do
        render_inline builder.cads_collection_select(
          :currency,
          collection: [%w[GBP GBP], %w[EUR EUR], %w[USD USD]],
          text_method: :first,
          value_method: :last,
          required: true
        )
      end

      it "includes aria-required attribute" do
        expect(page).to have_css "select[aria-required=true]"
      end
    end

    context "with hint text" do
      before do
        render_inline builder.cads_collection_select(
          :currency,
          collection: [%w[GBP GBP], %w[EUR EUR], %w[USD USD]],
          text_method: :first,
          value_method: :last,
          hint: "Example hint"
        )
      end

      it "includes the hint text" do
        expect(page).to have_text "Example hint"
      end

      it "sets aria-describedby" do
        expect(page).to have_css "select[aria-describedby=example_form_currency-hint]"
      end
    end

    context "when additional attributes are provided" do
      before do
        render_inline builder.cads_collection_select(
          :currency,
          collection: [%w[GBP GBP], %w[EUR EUR], %w[USD USD]],
          text_method: :first,
          value_method: :last,
          additional_attributes: { autocomplete: "name", "data-additional": "example" }
        )
      end

      it "passes additional attributes through to element" do
        pending "Not yet implemented"

        expect(page).to have_css "select[autocomplete=name]"
        expect(page).to have_css "select[data-additional=example]"
      end
    end

    context "with validation errors" do
      let(:model) { ExampleForm.invalid_example }
      let(:builder_method) do
        builder.cads_collection_select(
          :currency,
          collection: [%w[GBP GBP], %w[EUR EUR], %w[USD USD]],
          text_method: :first,
          value_method: :last
        )
      end

      before do
        model.valid? # trigger validation
        render_inline builder_method
      end

      it "renders error message" do
        expect(page).to have_css "#example_form_currency-error", text: "Currency is not included in the list"
      end

      it "sets aria-invalid" do
        expect(page).to have_css "select[aria-invalid=true]"
      end

      it "sets aria-describedby" do
        expect(page).to have_css "select[aria-describedby='example_form_currency-error']"
      end

      context "when there is hint text" do
        let(:builder_method) do
          builder.cads_collection_select(
            :currency,
            collection: [%w[GBP GBP], %w[EUR EUR], %w[USD USD]],
            text_method: :first,
            value_method: :last,
            hint: "Example hint"
          )
        end

        it "sets multiple aria-describedby" do
          expect(page).to have_css "select[aria-describedby='example_form_currency-error example_form_currency-hint']"
        end
      end
    end
  end
end
