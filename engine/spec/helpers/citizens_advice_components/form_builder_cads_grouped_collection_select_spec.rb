# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FormBuilder do
  include FormBuilderTestHelpers

  subject { page }

  let(:model) { ExampleForm.valid_example }
  let(:builder) { form_builder_for(model) }
  let(:example_options) do
    [
      FormOptionGroup.new("Africa", [
        FormOption.new(name: "South Africa", id: "ZA"),
        FormOption.new(name: "Somalia", id: "SO")
      ]),
      FormOptionGroup.new("Europe", [
        FormOption.new(name: "Denmark", id: "DE"),
        FormOption.new(name: "Finland", id: "FI")
      ])
    ]
  end

  describe "#cads_grouped_collection_select" do
    context "with no form model" do
      let(:builder) { form_builder_for(nil) }
      let(:field) do
        builder.cads_grouped_collection_select(
          :country,
          example_options,
          :options,
          :name,
          :id,
          :name,
          label: "Country"
        )
      end

      it "can be used without a form model" do
        render_inline field

        expect(page).to have_css('select optgroup[label="Africa"]')
        expect(page).to have_css('select optgroup[label="Europe"]')

        expect(page).to have_select("country", with_options: [
          "South Africa",
          "Somalia",
          "Denmark",
          "Finland"
        ])
      end
    end

    context "with default arguments" do
      let(:field) do
        builder.cads_grouped_collection_select(
          :country,
          example_options,
          :options,
          :name,
          :id,
          :name
        )
      end

      before do
        render_inline field
      end

      it "renders expected options and values" do
        expect(page).to have_css('select optgroup[label="Africa"]')
        expect(page).to have_css('select optgroup[label="Europe"]')

        expect(page).to have_select("example_form[country]", selected: "Denmark", with_options: [
          "South Africa",
          "Somalia",
          "Denmark",
          "Finland"
        ])
      end

      it "links the label to the input" do
        expect(page).to have_css "label[for=example_form_country-input]"
      end

      it "adds the correct id to the input" do
        expect(page).to have_css "#example_form_country-input"
      end

      it "does not have an aria-describedby attribute by default" do
        expect(page).to have_no_css "select[aria-describedby]"
      end

      it "does not add required to the input" do
        expect(page).to have_no_css "select[required]"
      end

      it "labels the field as optional" do
        expect(page).to have_text "Country (optional)", normalize_ws: true
      end

      context "when in Cymraeg" do
        around { |example| I18n.with_locale(:cy) { example.run } }

        it { is_expected.to have_text "(dewisol)" }
      end
    end

    context "with required parameter" do
      let(:field) do
        builder.cads_grouped_collection_select(
          :country,
          example_options,
          :options,
          :name,
          :id,
          :name,
          required: true
        )
      end

      it "includes aria-required attribute" do
        render_inline field
        expect(page).to have_css "select[aria-required=true]"
      end
    end

    context "with hint text" do
      let(:field) do
        builder.cads_grouped_collection_select(
          :country,
          example_options,
          :options,
          :name,
          :id,
          :name,
          hint: "Example hint"
        )
      end

      before do
        render_inline field
      end

      it "includes the hint text" do
        expect(page).to have_text "Example hint"
      end

      it "sets aria-describedby" do
        expect(page).to have_css "select[aria-describedby=example_form_country-hint]"
      end
    end

    context "when html options are provided" do
      let(:field) do
        builder.cads_grouped_collection_select(
          :country,
          example_options,
          :options,
          :name,
          :id,
          :name,
          {},
          autocomplete: "name",
          "data-additional": "example"
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
        builder.cads_grouped_collection_select(
          :country,
          example_options,
          :options,
          :name,
          :id,
          :name
        )
      end

      before do
        model.valid? # trigger validation
        render_inline field
      end

      it "renders error message" do
        expect(page).to have_css "#example_form_country-error", text: "Country is not included in the list"
      end

      it "sets aria-invalid" do
        expect(page).to have_css "select[aria-invalid=true]"
      end

      it "sets aria-describedby" do
        expect(page).to have_css "select[aria-describedby='example_form_country-error']"
      end

      context "when there is hint text" do
        let(:field) do
          builder.cads_grouped_collection_select(
            :country,
            example_options,
            :options,
            :name,
            :id,
            :name,
            hint: "Example hint"
          )
        end

        it "sets multiple aria-describedby" do
          expect(page).to have_css "select[aria-describedby='example_form_country-error example_form_country-hint']"
        end
      end
    end
  end
end
