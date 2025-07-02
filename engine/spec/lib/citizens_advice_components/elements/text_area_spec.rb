# frozen_string_literal: true

class ExampleForm
  include ActiveModel::Model

  attr_accessor :address
end

RSpec.describe CitizensAdviceComponents::Elements::TextArea do
  include_context "with view component"

  let(:component) { CitizensAdviceComponents::Textarea }
  let(:model) { ExampleForm.new(address: "example address") }

  describe "#render" do
    it "passes the attribute name to the component" do
      builder.cads_text_area(:address)

      expect(component).to have_received(:new).with(hash_including(name: "example_form[address]"))
    end

    it "passes the existing value to the component" do
      builder.cads_text_area(:address)

      expect(component).to have_received(:new).with(hash_including(options: hash_including(value: "example address")))
    end

    it "sets 'optional' to 'true' by default" do
      builder.cads_text_area(:address)

      expect(component).to have_received(:new).with(hash_including(options: hash_including(optional: true)))
    end

    context "with 'required' parameter" do
      it "sets 'optional' to 'false' when true" do
        builder.cads_text_area(:address, required: true)

        expect(component).to have_received(:new).with(hash_including(options: hash_including(optional: false)))
      end

      it "sets 'optional' to 'true' when false" do
        builder.cads_text_area(:address, required: false)

        expect(component).to have_received(:new).with(hash_including(options: hash_including(optional: true)))
      end
    end

    context "with 'hint' parameter" do
      it "passes hint to the component" do
        builder.cads_text_area(:address, hint: "Example hint")

        expect(component).to have_received(:new).with(hash_including(options: hash_including(hint: "Example hint")))
      end
    end

    context "with 'rows' parameter" do
      it "passes rows to the component" do
        builder.cads_text_area(:address, rows: 4)

        expect(component).to have_received(:new).with(hash_including(rows: 4))
      end
    end

    context "with 'page_heading' parameter" do
      it "passes hint to the text input component" do
        builder.cads_text_area(:name, page_heading: true)

        expect(component).to have_received(:new).with(hash_including(options: hash_including(page_heading: true)))
      end
    end

    context "with 'character_count' parameter" do
      it "passes hint to the text input component" do
        builder.cads_text_area(:name, character_count: 500)

        expect(component).to have_received(:new).with(hash_including(options: hash_including(character_count: 500)))
      end
    end

    context "when there is a validation error" do
      it "sets 'error_message'" do
        model.errors.add(:address, :presence, message: "is required")

        builder.cads_text_area(:address)

        expect(component).to have_received(:new).with(hash_including(options: hash_including(error_message: "Address is required")))
      end
    end
  end
end
