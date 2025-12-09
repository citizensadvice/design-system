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

  describe "#cads_collection_select" do
    context "with default arguments" do
      let(:field) do
        builder.cads_collection_select(:currency, example_options, :id, :name)
      end

      before do
        render_inline field
      end

      it "renders expected options and values" do
        expect(page).to have_select("example_form[currency]", selected: "£ Pound sterling", with_options: example_options.map(&:name))
        example_options.each do |option|
          expect(page).to have_css "select option[value='#{option.id}']"
        end
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
      let(:field) do
        builder.cads_collection_select(:currency, example_options, :id, :name, required: true)
      end

      it "includes aria-required attribute" do
        render_inline field
        expect(page).to have_css "select[aria-required=true]"
      end
    end

    context "with hint text" do
      let(:field) do
        builder.cads_collection_select(:currency, example_options, :id, :name, hint: "Example hint")
      end

      before do
        render_inline field
      end

      it "includes the hint text" do
        expect(page).to have_text "Example hint"
      end

      it "sets aria-describedby" do
        expect(page).to have_css "select[aria-describedby=example_form_currency-hint]"
      end
    end

    context "when additional attributes are provided" do
      let(:field) do
        builder.cads_collection_select(
          :currency, example_options, :id, :name,
          additional_attributes: { autocomplete: "name", "data-additional": "example" }
        )
      end

      it "passes additional attributes through to element" do
        render_inline field
        expect(page).to have_css "select[autocomplete=name]"
        expect(page).to have_css "select[data-additional=example]"
      end
    end

    context "with validation errors" do
      let(:model) { ExampleForm.invalid_example }
      let(:field) do
        builder.cads_collection_select(:currency, example_options, :id, :name)
      end

      before do
        model.valid? # trigger validation
        render_inline field
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
        let(:field) do
          builder.cads_collection_select(:currency, example_options, :id, :name, hint: "Example hint")
        end

        it "sets multiple aria-describedby" do
          expect(page).to have_css "select[aria-describedby='example_form_currency-error example_form_currency-hint']"
        end
      end
    end

    context "with deprecated named attributes" do
      let(:field) do
        builder.cads_collection_select(
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
