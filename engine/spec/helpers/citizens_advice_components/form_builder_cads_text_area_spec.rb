# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FormBuilder do
  include FormBuilderTestHelpers

  subject { page }

  let(:model) { ExampleForm.valid_example }
  let(:builder) { form_builder_for(model) }

  describe "#cads_text_area" do
    context "with default arguments" do
      let(:field) { builder.cads_text_area(:address) }

      before do
        render_inline field
      end

      it "does not set value as attribute" do
        expect(page).to have_no_css "textarea[value='Example address']"
      end

      it "includes the existing value as content" do
        expect(page).to have_text "Example address"
      end

      it "links the label to the input" do
        expect(page).to have_css "label[for=example_form_address-input]"
      end

      it "adds the correct id to the input" do
        expect(page).to have_css "#example_form_address-input"
      end

      it "does not have an aria-describedby attribute by default" do
        expect(page).to have_no_css "textarea[aria-describedby]"
      end

      it "renders a textarea with 8 rows" do
        expect(page).to have_css "textarea[rows=8]"
      end

      it "does not add required to the input" do
        expect(page).to have_no_css "textarea[required]"
      end

      it "labels the field as optional" do
        expect(page).to have_text "Address (optional)", normalize_ws: true
      end

      context "when in Cymraeg" do
        around { |example| I18n.with_locale(:cy) { example.run } }

        it { is_expected.to have_text "(dewisol)" }
      end
    end

    context "with required parameter" do
      let(:field) { builder.cads_text_area(:address, required: true) }

      it "includes aria-required attribute" do
        render_inline field
        expect(page).to have_css "textarea[aria-required=true]"
      end
    end

    context "with hint text" do
      let(:field) { builder.cads_text_area(:address, hint: "Example hint") }

      before do
        render_inline field
      end

      it "includes the hint text" do
        expect(page).to have_text "Example hint"
      end

      it "sets aria-describedby" do
        expect(page).to have_css "textarea[aria-describedby=example_form_address-hint]"
      end
    end

    context "with 'rows' parameter" do
      let(:field) { builder.cads_text_area(:address, rows: 10) }

      it "renders the textarea with the correct number of rows" do
        render_inline field
        expect(page).to have_css "textarea[rows=10]"
      end
    end

    context "with 'page_heading' parameter" do
      let(:field) { builder.cads_text_area(:address, page_heading: true) }

      it "wrap the label in a page heading" do
        render_inline field
        expect(page).to have_css "h1.cads-page-title label", text: "Address"
      end
    end

    context "when a character count is provided" do
      let(:field) { builder.cads_text_area(:address, character_count: 500) }

      before do
        render_inline field
      end

      it "passes the character count onto the component" do
        expect(page).to have_css "textarea[data-character-count=500]"
      end

      it "displays a fallback character count message" do
        expect(page).to have_text "You can enter up to 500 characters"
      end

      context "when welsh language" do
        around { |example| I18n.with_locale(:cy) { example.run } }

        it "displays a welsh language fallback character count message" do
          expect(page).to have_text "You can enter up to 500 characters (cy)"
        end
      end
    end

    context "with deprecated additional_attributes hash" do
      let(:field) do
        builder.cads_text_area(
          :name,
          additional_attributes: { autocomplete: "name", "data-additional": "example" }
        )
      end

      before { allow(CitizensAdviceComponents.deprecator).to receive(:warn) }

      it "logs deprecation warning" do
        render_inline field
        expect(CitizensAdviceComponents.deprecator).to have_received(:warn)
          .with(/additional_attributes hash is deprecated/)
      end

      it "passes via additional_attributes for backwards compatability" do
        render_inline field
        expect(page).to have_css "textarea[autocomplete=name]"
        expect(page).to have_css "textarea[data-additional=example]"
      end
    end

    context "with additional attributes" do
      let(:field) do
        builder.cads_text_area(
          :address,
          autocomplete: "name",
          "data-additional": "example"
        )
      end

      it "passes additional attributes through to element" do
        render_inline field
        expect(page).to have_css "textarea[autocomplete=name]"
        expect(page).to have_css "textarea[data-additional=example]"
      end
    end

    context "with validation errors" do
      let(:model) { ExampleForm.invalid_example }
      let(:field) { builder.cads_text_area(:address) }

      before do
        model.valid? # trigger validation
        render_inline field
      end

      it "renders error message" do
        expect(page).to have_css "#example_form_address-error", text: "Address can't be blank"
      end

      it "sets aria-invalid" do
        expect(page).to have_css "textarea[aria-invalid=true]"
      end

      it "sets aria-describedby" do
        expect(page).to have_css "textarea[aria-describedby='example_form_address-error']"
      end

      context "when there is hint text" do
        let(:field) { builder.cads_text_area(:address, hint: "Example hint") }

        it "sets multiple aria-describedby" do
          expect(page).to have_css "textarea[aria-describedby='example_form_address-error example_form_address-hint']"
        end
      end
    end

    context "with no form model" do
      let(:builder) { form_builder_for(nil) }
      let(:field) { builder.cads_text_area(:address) }

      it "can be used without a form model" do
        render_inline field
        expect(page).to have_css "textarea"
      end
    end
  end
end
