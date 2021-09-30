# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Badge, type: :component do
  let(:component) do
    described_class.new(type: type.presence)
  end

  let(:type) { nil }

  it "does not render when type is missing" do
    without_fetch_or_fallback_raises do
      render_inline component
      expect(rendered_component.at(".cads-badge")).not_to be_present
    end
  end

  context "when type is example" do
    let(:type) { :example }

    it "has the correct label" do
      render_inline component
      expect(rendered_component).to have_selector ".cads-badge--example", text: "Example"
    end

    context "when welsh language" do
      before { I18n.locale = :cy }

      it "has translated label" do
        render_inline component
        expect(rendered_component).to have_text "Enghraifft"
      end
    end
  end

  context "when type is important" do
    let(:type) { :important }

    it "has the correct label" do
      render_inline component
      expect(rendered_component).to have_selector ".cads-badge--important", text: "Important"
    end

    context "when welsh language" do
      before { I18n.locale = :cy }

      it "has translated label" do
        render_inline component
        expect(rendered_component).to have_text "Pwysig"
      end
    end
  end

  context "when type is adviser" do
    let(:type) { :adviser }

    it "has the correct label" do
      render_inline component
      expect(rendered_component).to have_selector ".cads-badge--adviser", text: "Adviser"
    end

    context "when welsh language" do
      before { I18n.locale = :cy }

      it "has translated label" do
        render_inline component
        expect(rendered_component).to have_text "Cynghorydd"
      end
    end
  end
end
