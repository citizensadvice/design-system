# frozen_string_literal: true

RSpec.describe DesignSystem::TargetedContentComponent do
  before { I18n.locale = :en }

  let(:type) { nil }
  let(:heading_level) { nil }

  subject(:component) do
    render_inline(
      DesignSystem::TargetedContentComponent.new(
        id: "example-id",
        title: "Example targeted content",
        body: "<p>Some content</p>",
        type: (type unless type.nil?),
        heading_level: (heading_level unless heading_level.nil?)
      )
    )
  end

  it "has a heading with expected id" do
    expect(component.at("h2").attr("id")).to eq "h-example-id"
  end

  it "has content with expected id" do
    expect(component.at("#example-id-content").name).to eq "div"
  end

  it "has data attributes containing descriptive labels" do
    expect(component.child.attr("data-descriptive-label-show")).to eq "show this section"
    expect(component.child.attr("data-descriptive-label-hide")).to eq "hide this section"
    expect(component.child.attr("data-close-label")).to eq "Close"
  end

  context "when type is omitted" do
    let(:type) { nil }

    it "renders default targeted content" do
      expect(component.at(".cads-targeted-content--adviser")).to be_nil
    end

    it "has no badge" do
      expect(component.at(".cads-badge")).to be_nil
    end
  end

  context "when type is adviser" do
    let(:type) { "adviser" }

    it "renders default targeted content" do
      expect(component.at(".cads-targeted-content--adviser")).to be_present
    end

    it "has and adviser badge" do
      expect(component.at(".cads-badge").text).to eq "Adviser"
    end

    context "when welsh language" do
      before { I18n.locale = :cy }
      it "has translated badge" do
        expect(component.at(".cads-badge").text).to eq "Cynghorydd"
      end
    end
  end

  context "when heading_level is omitted" do
    let(:heading_level) { nil }

    it "renders heading as a h2" do
      expect(component.at("[data-testid='targeted-content-title']").name).to eq "h2"
    end
  end

  context "when heading_level is provided" do
    let(:heading_level) { 3 }

    it "renders heading with provided level" do
      expect(component.at("[data-testid='targeted-content-title']").name).to eq "h3"
    end
  end

  context "when heading_level is too low" do
    let(:heading_level) { 1 }

    it "clamps heading level to a minimum of 2" do
      expect(component.at("[data-testid='targeted-content-title']").name).to eq "h2"
    end
  end

  context "when heading_level is too high" do
    let(:heading_level) { 5 }

    it "clamps heading level to a maximum of 4" do
      expect(component.at("[data-testid='targeted-content-title']").name).to eq "h4"
    end
  end
end
