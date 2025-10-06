# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FormBuilder do
  include FormBuilderTestHelpers

  subject { page }

  let(:model) { ExampleForm.invalid_example }
  let(:builder) { form_builder_for(model) }
  let(:builder_method) { builder.cads_error_summary }

  describe "#cads_error_summary" do
    context "when errors are present" do
      before do
        model.valid? # Trigger validations
        render_inline builder_method
      end

      it "renders title" do
        expect(page).to have_css "h2", text: "There is a problem"
      end

      it "renders a list for error messages" do
        expect(page).to have_css ".cads-error-summary"
        expect(page).to have_css "li a", count: 5
      end

      it "renders messages with links to the associated input" do
        expect(page).to have_link("Name can't be blank", href: "#example_form_name-input")
        expect(page).to have_link("Address can't be blank", href: "#example_form_address-input")
      end

      it "sets an autofocus attribute on the error summary" do
        expect(page).to have_css "[autofocus=autofocus]"
      end
    end

    describe "heading_level" do
      it "renders title with correct heading level" do
        pending "Not yet implemented"
        model.valid? # Trigger validations
        render_inline builder.cads_error_summary(heading_level: 3)
        expect(page).to have_css "h3", text: "There is a problem"
      end
    end

    context "when no errors present" do
      let(:model) { ExampleForm.valid_example }

      before do
        render_inline builder.cads_error_summary
      end

      specify "no error summary should be present" do
        expect(page).to have_no_css ".cads-error-summary"
      end
    end
  end
end
