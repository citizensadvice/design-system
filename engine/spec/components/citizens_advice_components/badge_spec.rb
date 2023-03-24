# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Badge, type: :component do
  subject { page }

  context "when type is missing" do
    before do
      without_fetch_or_fallback_raises do
        render_inline described_class.new(type: nil)
      end
    end

    it { is_expected.not_to have_selector ".cads-badge" }
  end

  context "when type is example" do
    before { render_inline described_class.new(type: :example) }

    it { is_expected.to have_selector ".cads-badge--example", text: "Example" }

    context "when welsh language" do
      around { |example| I18n.with_locale(:cy) { example.run } }

      it { is_expected.to have_text "Enghraifft" }
    end
  end

  context "when type is important" do
    before { render_inline described_class.new(type: :important) }

    it { is_expected.to have_selector ".cads-badge--important", text: "Important" }

    context "when welsh language" do
      around { |example| I18n.with_locale(:cy) { example.run } }

      it { is_expected.to have_text "Pwysig" }
    end
  end

  context "when type is adviser" do
    before { render_inline described_class.new(type: :adviser) }

    it { is_expected.to have_selector ".cads-badge--adviser", text: "Adviser" }

    context "when welsh language" do
      around { |example| I18n.with_locale(:cy) { example.run } }

      it { is_expected.to have_text "Cynghorydd" }
    end
  end
end
