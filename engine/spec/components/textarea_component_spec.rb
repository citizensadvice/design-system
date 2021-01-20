# frozen_string_literal: true

RSpec.describe DesignSystem::TextareaComponent do
  before { I18n.locale = :en }

  context "with required props" do
    let(:component) do
      render_inline(
        DesignSystem::TextareaComponent.new(
          name: "example",
          label: "Example textarea",
          rows: 5
        )
      )
    end

    let(:textarea) { component.at("textarea") }

    it "has expected name" do
      expect(textarea.attr("name")).to eq "example"
    end

    it "has expected id" do
      expect(textarea.attr("id")).to eq "example-input"
    end

    it "has expected rows" do
      expect(textarea.attr("rows")).to eq "5"
    end

    it "has no value" do
      expect(textarea.attr("value")).to be_nil
    end
  end

  context "with value" do
    let(:component) do
      render_inline(
        DesignSystem::TextareaComponent.new(
          name: "example",
          label: "Example textarea",
          rows: 5,
          value: "Example value"
        )
      )
    end

    it "has a value" do
      expect(component.at("textarea").attr("value")).to eq "Example value"
    end
  end

  context "with invalid rows" do
    let(:size) { "invalid" }

    it "throws a validation error" do
      expect(
        DesignSystem::TextareaComponent.new(
          name: "example",
          label: "Example textarea",
          rows: 500
        )
      ).to_not be_valid
    end
  end
end
