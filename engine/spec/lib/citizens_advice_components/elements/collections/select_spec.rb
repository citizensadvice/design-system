# frozen_string_literal: true

class ExampleForm
  include ActiveModel::Model

  attr_accessor :ice_cream
end

RSpec.describe CitizensAdviceComponents::Elements::Collections::Select do
  include_context "with view component"

  let(:component) { CitizensAdviceComponents::Select }
  let(:component_double) { instance_double(component, render_in: nil) }
  let(:model) { ExampleForm.new(ice_cream: "0002") }

  describe "#render" do
    let(:ice_cream) { Struct.new(:reference, :colour, :name) }

    let(:collection) do
      [
        ice_cream.new("0001", "Blue", "Bubble gum"),
        ice_cream.new("0002", "Green", "Pistachio"),
        ice_cream.new("0003", "Pink", "Strawberry")
      ]
    end

    it "passes the attribute name to the radio group component" do
      builder.cads_collection_select(:ice_cream, collection: collection, text_method: :name, value_method: :reference)

      expect(component).to have_received(:new).with(hash_including(name: "example_form_ice_cream"))
    end

    it "passes the collection, reformatted with 'label', 'value' and 'checked' keys to the radio group component" do
      builder.cads_collection_select(:ice_cream, collection: collection, text_method: :name, value_method: :reference)

      expect(component).to have_received(:new).with(hash_including(select_options: [["Bubble gum", "0001"], ["Pistachio", "0002"],
                                                                                    ["Strawberry", "0003"]]))
    end

    it "sets 'optional' to 'true' by default" do
      builder.cads_collection_select(:ice_cream, collection: collection, text_method: :name, value_method: :reference)

      expect(component).to have_received(:new).with(hash_including(options: hash_including(optional: true)))
    end

    context "with 'required' parameter" do
      it "sets 'optional' to 'false' when true" do
        builder.cads_collection_select(
          :ice_cream,
          collection: collection,
          text_method: :name,
          value_method: :reference,
          required: true
        )

        expect(component).to have_received(:new).with(hash_including(options: hash_including(optional: false)))
      end

      it "sets 'optional' to 'true' when false" do
        builder.cads_collection_select(
          :ice_cream,
          collection: collection,
          text_method: :name,
          value_method: :reference,
          required: false
        )

        expect(component).to have_received(:new).with(hash_including(options: hash_including(optional: true)))
      end
    end

    context "with 'hint' parameter" do
      it "passes hint to the text input component" do
        builder.cads_collection_select(
          :ice_cream,
          collection: collection,
          text_method: :name,
          value_method: :reference,
          hint: "Example hint"
        )

        expect(component).to have_received(:new).with(hash_including(options: hash_including(hint: "Example hint")))
      end
    end

    context "when there is a validation error" do
      it "sets 'error_message'" do
        model.errors.add(:ice_cream, :example, message: "has an example error")

        builder.cads_collection_select(:ice_cream, collection: collection, text_method: :name, value_method: :reference)

        expect(component).to have_received(:new).with(
          hash_including(options: hash_including(error_message: "Ice cream has an example error"))
        )
      end
    end
  end
end
