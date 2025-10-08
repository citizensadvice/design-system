# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FormBuilder do
  include FormBuilderTestHelpers

  subject { page }

  let(:model) { ExampleForm.invalid_example }
  let(:builder) { form_builder_for(model) }

  describe "#cads_error_summary" do
    context "when no errors present" do
      let(:model) { ExampleForm.valid_example }
      let(:error_summary) { builder.cads_error_summary }

      it "shows no error summary by default" do
        render_inline error_summary
        expect(page).to have_no_css ".cads-error-summary"
      end

      it "shows no error summary when model is validated" do
        model.valid?
        render_inline error_summary
        expect(page).to have_no_css ".cads-error-summary"
      end
    end

    context "when errors are present" do
      let(:error_summary) { builder.cads_error_summary }

      before do
        model.valid? # Trigger validations
        render_inline error_summary
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

    context "with custom heading_level" do
      let(:error_summary) { builder.cads_error_summary(heading_level: 3) }

      it "renders title with correct heading level" do
        pending "Not yet implemented"
        model.valid? # Trigger validations
        render_inline error_summary
        expect(page).to have_css "h3", text: "There is a problem"
      end
    end
  end
end
