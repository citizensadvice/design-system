# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FormBuilder do
  include FormBuilderTestHelpers

  subject { page }

  let(:model) { ExampleForm.valid_example }
  let(:builder) { form_builder_for(model) }

  describe "#cads_text_field" do
    context "with default arguments" do
      before do
        render_inline builder.cads_text_field(:name)
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
      before do
        render_inline builder.cads_text_field(:name, required: true)
      end

      it "includes aria-required attribute" do
        expect(page).to have_css "input[aria-required=true]"
      end
    end

    context "with custom type" do
      before do
        render_inline builder.cads_text_field(:name, type: :email)
      end

      it "passes through the type" do
        expect(page).to have_field(type: :email)
      end
    end

    context "with hint text" do
      before do
        render_inline builder.cads_text_field(:name, hint: "Example hint")
      end

      it "includes the hint text" do
        expect(page).to have_text "Example hint"
      end

      it "sets aria-describedby" do
        expect(page).to have_css "input[aria-describedby=example_form_name-hint]"
      end
    end

    describe "with 'page_heading' parameter" do
      before do
        render_inline builder.cads_text_field(:name, page_heading: true)
      end

      it "wrap the label in a page heading" do
        expect(page).to have_css "h1.cads-page-title label", text: "Name"
      end
    end

    context "with 'width' parameter" do
      before do
        render_inline builder.cads_text_field(:name, width: :four_chars)
      end

      it "renders the input at the correct width" do
        expect(page).to have_css ".cads-input--four-chars"
      end
    end

    context "with invalid 'width' parameter" do
      before do
        without_fetch_or_fallback_raises do
          render_inline builder.cads_text_field(:name, width: :invalid)
        end
      end

      it "renders a full width version" do
        expect(page).to have_css ".cads-input"
      end
    end

    context "when additional attributes are provided" do
      before do
        render_inline builder.cads_text_field(
          :name,
          additional_attributes: { autocomplete: "name", "data-additional": "example" }
        )
      end

      it "passes additional attributes through to element" do
        expect(page).to have_css "input[autocomplete=name]"
        expect(page).to have_css "input[data-additional=example]"
      end
    end

    context "with validation errors" do
      let(:model) { ExampleForm.invalid_example }
      let(:builder_method) { builder.cads_text_field(:name) }

      before do
        model.valid? # trigger validation
        render_inline builder_method
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
        let(:builder_method) { builder.cads_text_field(:name, hint: "Example hint") }

        it "sets multiple aria-describedby" do
          expect(page).to have_css "input[aria-describedby='example_form_name-error example_form_name-hint']"
        end
      end
    end

    context "with no form model" do
      let(:builder) { form_builder_for(nil) }

      it "can be used without a form model" do
        pending "Not currently implemented"

        render_inline builder.cads_text_field(:name)
        expect(page).to have_field type: :text
      end
    end
  end
end
