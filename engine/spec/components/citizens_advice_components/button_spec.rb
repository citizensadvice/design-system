# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Button, type: :component do
  context "with default options" do
    subject(:component) { described_class.new.with_content("Example") }

    it "renders button" do
      render_inline component
      expect(rendered_component).to have_selector ".cads-button", text: "Example"
    end
  end

  describe "variant" do
    subject(:component) { described_class.new(variant: variant).with_content("Example") }

    context "when missing variant" do
      let(:variant) { nil }

      it "renders a primary button" do
        without_fetch_or_fallback_raises do
          render_inline component
          expect(rendered_component).to have_css ".cads-button__primary"
        end
      end
    end

    context "when variant is primary" do
      let(:variant) { :primary }

      it "renders a primary button" do
        render_inline component
        expect(rendered_component).to have_css ".cads-button__primary"
      end
    end

    context "when variant is secondary" do
      let(:variant) { :secondary }

      it "renders a secondary button" do
        render_inline component
        expect(rendered_component).to have_css ".cads-button__secondary"
      end
    end
  end

  describe "type" do
    subject(:component) { described_class.new(type: type).with_content("Example") }

    context "when missing type" do
      let(:type) { nil }

      it "renders a button type" do
        without_fetch_or_fallback_raises do
          render_inline component
          expect(rendered_component).to have_css("[type='button']")
        end
      end
    end

    context "when type is submit" do
      let(:type) { :submit }

      it "renders a submit button" do
        render_inline component
        expect(rendered_component).to have_css("[type='submit']")
      end
    end
  end

  describe "additional_attributes" do
    subject(:component) do
      described_class
        .new(attributes: { "data-testid": "example" })
        .with_content("Example")
    end

    it "allows additional attributes" do
      render_inline component
      expect(rendered_component).to have_css("[data-testid='example']")
    end
  end

  describe "icons" do
    subject(:component) { described_class.new }

    it "renders left icon slot" do
      render_inline(component) do |c|
        c.icon_left { "Left slot" }
      end

      expect(rendered_component).to have_css ".cads-button__icon-left", text: "Left slot"
    end

    it "renders right icon slot" do
      render_inline(component) do |c|
        c.icon_right { "Right slot" }
      end

      expect(rendered_component).to have_css ".cads-button__icon-right", text: "Right slot"
    end
  end
end
