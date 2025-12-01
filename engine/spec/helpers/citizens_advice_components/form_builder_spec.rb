# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FormBuilder do
  include FormBuilderTestHelpers

  subject { page }

  describe "field_error_proc" do
    let(:model) { ExampleForm.invalid_example }
    let(:builder) { form_builder_for(model) }

    before do
      model.valid? # trigger validation
    end

    it "disables default field_with_errors class for standard form builder methods" do
      render_inline builder.text_field(:name)
      expect(page).to have_no_css ".field_with_errors"
    end

    it "disables default field_with_errors class for custom form builder methods" do
      render_inline builder.cads_text_field(:name)
      expect(page).to have_no_css ".field_with_errors"
    end
  end
end
