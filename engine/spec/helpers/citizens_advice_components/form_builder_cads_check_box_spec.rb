# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FormBuilder do
  include FormBuilderTestHelpers

  subject { page }

  let(:model) { ExampleForm.valid_example }
  let(:builder) { form_builder_for(model) }

  describe "#cads_check_box" do
    context "with default arguments" do
      before do
        render_inline builder.cads_check_box(:confirmation)
      end

      it "renders checkbox with linkable id" do
        expect(page).to have_field(
          "example_form[confirmation]",
          with: "1",
          type: :checkbox,
          checked: true
        )

        pending "Bug: checkbox generates IDs by name"

        expect(page).to have_field(
          "example_form[confirmation]",
          with: "1",
          id: "example_form_confirmation-input",
          type: :checkbox,
          checked: true
        )
      end

      it "does not add required to any inputs" do
        expect(page).to have_no_css "input[required]"
      end
    end

    context "with validation errors" do
      let(:model) { ExampleForm.invalid_example }
      let(:builder_method) { builder.cads_check_box(:confirmation) }

      before do
        model.valid? # trigger validation
        render_inline builder_method
      end

      it "renders error message" do
        expect(page).to have_css(
          "[id='example_form[confirmation]-error']",
          text: "Confirmation can't be blank"
        )

        pending "Bug: checkbox generates IDs by name"

        expect(page).to have_css(
          "#example_form_confirmation-error",
          text: "Confirmation can't be blank"
        )
      end

      it "sets aria-describedby" do
        expect(page).to have_css(
          "input[aria-describedby='example_form[confirmation]-error']"
        )

        pending "Bug: checkbox generates IDs by name"

        expect(page).to have_css(
          "input[aria-describedby='example_form_confirmation-error']"
        )
      end
    end
  end
end
