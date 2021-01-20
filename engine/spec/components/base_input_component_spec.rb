# frozen_string_literal: true

RSpec.describe DesignSystem::BaseInputComponent do
  before { I18n.locale = :en }

  context "with required props" do
    let(:component) do
      render_inline(
        DesignSystem::BaseInputComponent.new(
          name: "example",
          label: "Example input"
        )
      )
    end

    it "has expected label attributes" do
      expect(component.at("label").attr("id")).to eq "example-label"
      expect(component.at("label").attr("for")).to eq "example-input"
    end

    it "does not have hint" do
      expect(component.at(".cads-form-field__hint")).to be_nil
    end

    it "does not have optional marker" do
      expect(component.at(".cads-form-field__optional")).to be_nil
    end

    it "does not have error message" do
      expect(component.at(".cads-form-field__error-message")).to be_nil
    end
  end

  context "with hint" do
    let(:component) do
      render_inline(
        DesignSystem::BaseInputComponent.new(
          name: "example",
          label: "Example input",
          hint: "This is the hint for the input"
        )
      )
    end

    it "has hint text" do
      expect(component.at(".cads-form-field__hint").text).to eq "This is the hint for the input"
    end
  end

  context "with optional flag" do
    let(:component) do
      render_inline(
        DesignSystem::BaseInputComponent.new(
          name: "example",
          label: "Example input",
          hint: "This is the hint for the input",
          is_optional: true
        )
      )
    end

    it "has optional label" do
      expect(component.at("label").text.strip).to eq "Example input\noptional"
    end
  end

  context "with error message" do
    let(:component) do
      render_inline(
        DesignSystem::BaseInputComponent.new(
          name: "example",
          label: "Example input",
          hint: "This is the hint for the input",
          is_optional: true,
          error_message: "This is an error message"
        )
      )
    end

    it "has optional label" do
      expect(component.at(".cads-form-field--has-error")).to_not be_nil
      expect(component.at(".cads-form-field__error-marker")).to_not be_nil
      expect(component.at(".cads-form-field__error-message").text.strip).to eq "This is an error message"
    end
  end
end
