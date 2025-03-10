# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Elements::Button do
  include_context "with view component"

  let(:component) { CitizensAdviceComponents::Button }
  let(:model) { nil } # Buttons don't use model

  describe "#render" do
    it "calls the button component with default parameters" do
      builder.cads_button

      expect(component).to have_received(:new).with(type: :submit, variant: :primary)
      expect(component_double).to have_received(:with_content).with("Save changes")
    end

    it "calls the button component with a custom label text" do
      builder.cads_button "Next"

      expect(component_double).to have_received(:with_content).with("Next")
    end
  end
end
