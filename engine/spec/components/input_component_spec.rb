# frozen_string_literal: true

RSpec.describe DesignSystem::InputComponent do
  before { I18n.locale = :en }

  context "with required props" do
    let(:component) do
      render_inline(
        DesignSystem::InputComponent.new(
          name: "example",
          label: "Example input"
        )
      )
    end

    let(:input) { component.at("input") }

    it "has expected type" do
      expect(input.attr("type")).to eq "text"
    end

    it "has expected name" do
      expect(input.attr("name")).to eq "example"
    end

    it "has expected id" do
      expect(input.attr("id")).to eq "example-input"
    end

    it "has no value" do
      expect(input.attr("value")).to be_nil
    end
  end

  context "with value" do
    let(:component) do
      render_inline(
        DesignSystem::InputComponent.new(
          name: "example",
          label: "Example input",
          value: "Example value"
        )
      )
    end

    it "has a value" do
      expect(component.at("input").attr("value")).to eq "Example value"
    end
  end

  %w[2ch 4ch 8ch 16ch].each do |size|
    context "with #{size} size" do
      let(:component) do
        render_inline(
          DesignSystem::InputComponent.new(
            name: "example",
            label: "Example input",
            value: "Example value",
            size: size
          )
        )
      end

      it "has expected class name" do
        expect(component.at("input").attr("class")).to include "cads-input--#{size}"
      end
    end
  end

  context "with invalid size" do
    let(:size) { "invalid" }

    it "throws a validation error" do
      expect(
        DesignSystem::InputComponent.new(
          name: "example",
          label: "Example input",
          value: "Example value",
          size: "invalid"
        )
      ).to_not be_valid
    end
  end
end
