# frozen_string_literal: true

RSpec.describe DesignSystem::ButtonComponent do
  before { I18n.locale = :en }

  context "with no arguments" do
    let(:component) do
      render_inline(DesignSystem::ButtonComponent.new)
    end

    it "has primary class" do
      expect(component.at("button").attr("class")).to include "cads-button__primary"
    end

    it "has a type of button" do
      expect(component.at("button").attr("type")).to eq "button"
    end
  end

  %w[primary secondary tertiary].each do |variant|
    context "with #{variant} variant" do
      let(:component) do
        render_inline(DesignSystem::ButtonComponent.new(variant: variant))
      end

      it "has expected class name" do
        expect(component.at("button").attr("class")).to include "cads-button__#{variant}"
      end
    end
  end

  context "with invalid variant" do
    let(:variant) { "invalid" }

    it "throws a validation error" do
      expect(DesignSystem::ButtonComponent.new(variant: "invalid")).to_not be_valid
    end
  end

  %w[button submit].each do |type|
    context "with html #{type} type" do
      let(:component) do
        render_inline(DesignSystem::ButtonComponent.new(type: type))
      end

      it "has expected type attribute" do
        expect(component.at("button").attr("type")).to eq type
      end
    end
  end
end
