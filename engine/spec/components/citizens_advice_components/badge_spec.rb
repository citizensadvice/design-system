# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Badge, type: :component do
  subject(:badge) { component.at(".cads-badge--#{type}") }

  let(:component) do
    render_inline(described_class.new(type: type.presence))
  end
  let(:type) { :adviser }

  context "when missing type" do
    let(:type) { nil }

    it "does not render when type is missing" do
      without_fetch_or_fallback_raises do
        expect(component.at(".cads-badge")).not_to be_present
      end
    end
  end

  context "when type is example" do
    let(:type) { :example }

    it "has the correct label" do
      expect(badge.text).to eq "Example"
    end

    context "when welsh language" do
      before { I18n.locale = :cy }

      it "has translated label" do
        expect(badge.text).to eq "Enghraifft"
      end
    end
  end

  context "when type is important" do
    let(:type) { :important }

    it "has the correct label" do
      expect(badge.text).to eq "Important"
    end

    context "when welsh language" do
      before { I18n.locale = :cy }

      it "has translated label" do
        expect(badge.text).to eq "Pwysig"
      end
    end
  end

  context "when type is adviser" do
    let(:type) { :adviser }

    it "has the correct label" do
      expect(badge.text).to eq "Adviser"
    end

    context "when welsh language" do
      before { I18n.locale = :cy }

      it "has translated label" do
        expect(badge.text).to eq "Cynghorydd"
      end
    end
  end
end
