# frozen_string_literal: true

RSpec.describe DesignSystem::CalloutComponent do
  before { I18n.locale = :en }

  subject(:component) do
    DesignSystem::CalloutComponent.new(
      body: <<-HTML.chomp,
        <h3>This is the callout title</h3>
        <p>
          The important callout should be used for any important
          snippet of text that has serious and/or legal implications
          if the client does not follow the advice.
        </p>
      HTML
      type: (type unless type.nil?)
    )
  end

  context "when type is omitted" do
    let(:type) { nil }

    it "renders a standard callout" do
      expect(render_inline(component).at(".cads-callout").attr("class")).to include "cads-callout-standard"
    end

    it "has no label" do
      expect(render_inline(component).at(".cads-callout-label")).to be_nil
    end
  end

  context "when type is example" do
    let(:type) { "example" }

    it "renders an example callout" do
      expect(render_inline(component).at(".cads-callout").attr("class")).to include "cads-callout-example"
    end

    it "has the correct label" do
      expect(render_inline(component).at(".cads-callout-label").text).to eq "Example"
    end

    context "when welsh language" do
      before { I18n.locale = :cy }
      it "has translated label" do
        expect(render_inline(component).at(".cads-callout-label").text).to eq "Enghraifft"
      end
    end
  end

  context "when type is important" do
    let(:type) { "important" }

    it "renders an important callout" do
      expect(render_inline(component).at(".cads-callout").attr("class")).to include "cads-callout-important"
    end

    it "has the correct label" do
      expect(render_inline(component).at(".cads-callout-label").text).to eq "Important"
    end

    context "when welsh language" do
      before { I18n.locale = :cy }
      it "has translated label" do
        expect(render_inline(component).at(".cads-callout-label").text).to eq "Pwysig"
      end
    end
  end

  context "when type is adviser" do
    let(:type) { "adviser" }

    it "renders an adviser callout" do
      expect(render_inline(component).at(".cads-callout").attr("class")).to include "cads-callout-adviser"
    end

    it "has the correct label" do
      expect(render_inline(component).at(".cads-callout-label").text).to eq "Adviser"
    end

    context "when welsh language" do
      before { I18n.locale = :cy }
      it "has translated label" do
        expect(render_inline(component).at(".cads-callout-label").text).to eq "Cynghorydd"
      end
    end
  end

  context "with invalid type" do
    let(:type) { "invalid" }

    it "throws a validation error" do
      expect(component).to_not be_valid
    end
  end
end
