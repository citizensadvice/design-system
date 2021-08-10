# frozen_string_literal: true

RSpec.shared_examples "public_targeted_content" do
  it "renders" do
    expect(component.at(".cads-targeted-content")).to be_present
  end

  it "has no label" do
    expect(component.at(".cads-badge")).not_to be_present
  end
end

RSpec.shared_examples "adviser_targeted_content" do
  let(:badge) { component.at(".cads-badge") }

  it "renders an adviser variant" do
    expect(component.at(".cads-targeted-content--adviser")).to be_present
  end

  it "has adviser label" do
    expect(badge.text).to eq "Adviser"
  end

  context "when welsh language" do
    before { I18n.locale = :cy }

    it "has translated label" do
      expect(badge.text).to eq "Cynghorydd"
    end
  end
end

RSpec.describe CitizensAdviceComponents::TargetedContent, type: :component do
  subject(:component) do
    render_inline(
      described_class.new(
        id: "targeted-content-example",
        type: type.presence,
        title: title.presence,
        heading_level: heading_level.presence
      )
    ) do
      "Example content"
    end
  end

  let(:type) { :public }
  let(:title) { "Example title" }
  let(:heading_level) { nil }

  it "renders content block" do
    expect(component.text).to include "Example content"
  end

  it_behaves_like "public_targeted_content"

  it "has a h2 title by default" do
    expect(component.at("h2").text.strip).to eq(title)
  end

  context "when missing type" do
    let(:type) { nil }

    around do |example|
      without_fetch_or_fallback_raises do
        example.run
      end
    end

    it "renders public targeted content" do
      expect(component.at(".cads-targeted-content")).to be_present
    end

    it "does not have badge" do
      expect(component.at(".cads-badge")).not_to be_present
    end
  end

  context "when type is adviser" do
    let(:type) { :adviser }

    it_behaves_like "adviser_targeted_content"
  end

  context "with custom heading_level" do
    let(:heading_level) { 3 }

    it "has h3 heading" do
      expect(component.at("h3")).to be_present
    end

    context "with heading_level under limit" do
      let(:heading_level) { 1 }

      it "has heading clamped to minimum" do
        expect(component.at("h2")).to be_present
      end
    end

    context "with heading_level over limit" do
      let(:heading_level) { 7 }

      it "has heading clamped to maximum" do
        expect(component.at("h6")).to be_present
      end
    end

    context "with invalid heading_level" do
      let(:heading_level) { "not_a_heading_level" }

      it "has heading set to default" do
        expect(component.at("h2")).to be_present
      end
    end
  end

  context "when no content present" do
    subject(:component) do
      render_inline(CitizensAdviceComponents::Callout.new(type: :standard))
    end

    it "does not render" do
      expect(component.at("section")).not_to be_present
    end
  end
end
