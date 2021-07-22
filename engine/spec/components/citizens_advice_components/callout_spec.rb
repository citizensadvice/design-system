# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Callout, type: :component do
  subject(:component) do
    render_inline(described_class.new(type: type.presence, title: title.presence)) do
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

    it "renders a standard callout" do
      without_fetch_or_fallback_raises do
        expect(component.at(".cads-callout--standard")).to be_present
      end
    end

    it "does not render a badge" do
      without_fetch_or_fallback_raises do
        expect(component.at(".cads-badge")).not_to be_present
      end
    end
  end

  context "when type is example" do
    let(:type) { :example }

    it "renders an example callout" do
      expect(component.at(".cads-callout--example")).to be_present
    end

    it "has expected badge" do
      expect(component.at(".cads-badge--example")).to be_present
    end
  end

  context "when type is important" do
    let(:type) { :important }

    it "renders an important callout" do
      expect(component.at(".cads-callout--important")).to be_present
    end

    it "has expected badge" do
      expect(component.at(".cads-badge--important")).to be_present
    end
  end

  context "when type is adviser" do
    let(:type) { :adviser }

    it "renders an adviser callout" do
      expect(component.at(".cads-callout--adviser")).to be_present
    end

    it "has expected badge" do
      expect(component.at(".cads-badge--adviser")).to be_present
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
      render_inline(described_class.new(type: :standard))
    end

    it "does not render" do
      expect(component.at("section")).not_to be_present
    end
  end
end
