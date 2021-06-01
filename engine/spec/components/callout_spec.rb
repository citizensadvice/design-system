# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Callout, type: :component do
  subject(:component) do
    render_inline(
      CitizensAdviceComponents::Callout.new(
        type: type.presence,
        title: title.presence
      )
    ) do
      "Example content"
    end
  end

  let(:type) { :standard }
  let(:title) { nil }

  it "renders content block" do
    expect(component.text).to include "Example content"
  end

  context "when missing type" do
    let(:type) { nil }

    context "non-production rails env" do
      before do
        allow(Rails.env).to receive(:production?).and_return(false)
      end

      it "raises an error with available options" do
        expect do
          CitizensAdviceComponents::Callout.new
        end.to raise_error(CitizensAdviceComponents::FetchOrFallbackHelper::InvalidValueError)
      end
    end

    context "production rails env" do
      before do
        allow(Rails.env).to receive(:production?).and_return(true)
      end

      it "renders a standard callout" do
        expect(component.at(".cads-callout").attr("class")).to include "cads-callout--standard"
      end

      it "has no label" do
        expect(component.at(".cads-badge")).to be_nil
      end
    end
  end

  context "when type is example" do
    let(:type) { :example }

    it "renders an example callout" do
      expect(component.at(".cads-callout").attr("class")).to include "cads-callout--example"
    end

    it "has the correct label" do
      expect(component.at(".cads-badge").text).to eq "Example"
    end

    context "when welsh language" do
      before { I18n.locale = :cy }
      it "has translated label" do
        expect(component.at(".cads-badge").text).to eq "Enghraifft"
      end
    end
  end

  context "when type is important" do
    let(:type) { :important }

    it "renders an important callout" do
      expect(component.at(".cads-callout").attr("class")).to include "cads-callout--important"
    end

    it "has the correct label" do
      expect(component.at(".cads-badge").text).to eq "Important"
    end

    context "when welsh language" do
      before { I18n.locale = :cy }
      it "has translated label" do
        expect(component.at(".cads-badge").text).to eq "Pwysig"
      end
    end
  end

  context "when type is adviser" do
    let(:type) { :adviser }

    it "renders an adviser callout" do
      expect(component.at(".cads-callout").attr("class")).to include "cads-callout--adviser"
    end

    it "has the correct label" do
      expect(component.at(".cads-badge").text).to eq "Adviser"
    end

    context "when welsh language" do
      before { I18n.locale = :cy }
      it "has translated label" do
        expect(component.at(".cads-badge").text).to eq "Cynghorydd"
      end
    end
  end

  context "when title is provided" do
    let(:title) { "Descriptive title" }

    it "Includes descriptive aria-label" do
      expect(component.at("section").attr("aria-label")).to eq "Descriptive title"
    end
  end

  context "when no content present" do
    subject(:component) do
      render_inline(CitizensAdviceComponents::Callout.new(type: :standard))
    end

    it "does not render" do
      expect(component.at("section")).to be_nil
    end
  end
end
