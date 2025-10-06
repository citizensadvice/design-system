# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FormBuilder do
  include FormBuilderTestHelpers

  subject { page }

  let(:model) { ExampleForm.valid_example }
  let(:builder) { form_builder_for(model) }

  describe "#cads_text_field" do
    context "with default arguments" do
      let(:field) { builder.cads_text_field(:name) }

      before do
        render_inline field
      end

      it "renders text field with value" do
        expect(page).to have_field(type: "text", with: "Example name")
      end

      it "links the label to the input" do
        expect(page).to have_css "label[for=example_form_name-input]"
      end

      it "adds the correct id to the input" do
        expect(page).to have_css "#example_form_name-input"
      end

      it "does not have an aria-describedby attribute by default" do
        expect(page).to have_no_css "input[aria-describedby]"
      end

      it "does not add required to the input" do
        expect(page).to have_no_css "input[required]"
      end

      it "labels the field as optional" do
        expect(page).to have_text "Name (optional)", normalize_ws: true
      end

      context "when in Cymraeg" do
        around { |example| I18n.with_locale(:cy) { example.run } }

        it { is_expected.to have_text "(dewisol)" }
      end
    end

    context "with required parameter" do
      let(:field) { builder.cads_text_field(:name, required: true) }

      it "uses aria-required instead of required attribute" do
        render_inline field
        expect(page).to have_no_css "input[required]"
        expect(page).to have_css "input[aria-required=true]"
      end
    end

    context "with custom type" do
      let(:field) { builder.cads_text_field(:name, type: :email) }

      it "passes through the type" do
        render_inline field
        expect(page).to have_field(type: :email)
      end
    end

    context "with hint text" do
      let(:field) { builder.cads_text_field(:name, hint: "Example hint") }

      before do
        render_inline field
      end

      it "includes the hint text" do
        expect(page).to have_text "Example hint"
      end

      it "sets aria-describedby" do
        expect(page).to have_css "input[aria-describedby=example_form_name-hint]"
      end
    end

    context "with 'page_heading' parameter" do
      let(:field) { builder.cads_text_field(:name, page_heading: true) }

      before do
        render_inline field
      end

      it "wrap the label in a page heading" do
        expect(page).to have_css "h1.cads-page-title label", text: "Name"
      end
    end

    context "with 'width' parameter" do
      let(:field) { builder.cads_text_field(:name, width: :four_chars) }

      it "renders the input at the correct width" do
        render_inline field
        expect(page).to have_css ".cads-input--four-chars"
      end
    end

    context "with invalid 'width' parameter" do
      let(:field) { builder.cads_text_field(:name, width: :invalid) }

      it "renders a full width version" do
        without_fetch_or_fallback_raises do
          render_inline field
          expect(page).to have_css ".cads-input"
        end
      end
    end

    context "with deprecated additional_attributes hash" do
      let(:field) do
        builder.cads_text_field(
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
    end

    context "with additional attributes" do
      let(:field) do
        builder.cads_text_field(
          :name,
          autocomplete: "name", "data-additional": "example"
        )
      end

      it "passes additional attributes through to element" do
        render_inline field
        expect(page).to have_css "input[autocomplete=name]"
        expect(page).to have_css "input[data-additional=example]"
      end
    end

    context "with validation errors" do
      let(:model) { ExampleForm.invalid_example }
      let(:field) { builder.cads_text_field(:name) }

      before do
        model.valid? # trigger validation
        render_inline field
      end

      it "renders error message" do
        expect(page).to have_css "#example_form_name-error", text: "Name can't be blank"
      end

      it "sets aria-invalid" do
        expect(page).to have_css "input[aria-invalid=true]"
      end

      it "sets aria-describedby" do
        expect(page).to have_css "input[aria-describedby='example_form_name-error']"
      end

      context "when there is hint text" do
        let(:field) { builder.cads_text_field(:name, hint: "Example hint") }

        it "sets multiple aria-describedby" do
          expect(page).to have_css "input[aria-describedby='example_form_name-error example_form_name-hint']"
        end
      end
    end

    context "with no form model" do
      let(:builder) { form_builder_for(nil) }
      let(:field) { builder.cads_text_field(:name) }

      it "can be used without a form model" do
        render_inline field
        expect(page).to have_field type: :text
      end
    end
  end
end
