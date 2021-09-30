# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Callout, type: :component do
  subject(:component) { described_class.new(type: type.presence) }

  let(:type) { :standard }

  context "when no content present" do
    it "does not render" do
      render_inline component
      expect(rendered_component).not_to be_present
    end
  end

  context "when content present" do
    it "renders content block" do
      render_inline(component) { "Example content" }
      expect(rendered_component).to have_text "Example content"
    end
  end

  context "when missing type" do
    let(:type) { nil }

    it "renders a standard callout" do
      without_fetch_or_fallback_raises do
        render_inline(component) { "Example content" }
        expect(rendered_component).to have_selector ".cads-callout--standard"
      end
    end

    it "does not render a badge" do
      without_fetch_or_fallback_raises do
        render_inline(component) { "Example content" }
        expect(rendered_component).to have_no_selector ".cads-badge"
      end
    end
  end

  context "when type is example" do
    let(:type) { :example }

    it "renders an example callout" do
      render_inline(component) { "Example content" }
      expect(rendered_component).to have_selector ".cads-callout--example"
    end

    it "has expected badge" do
      render_inline(component) { "Example content" }
      expect(rendered_component).to have_selector ".cads-badge--example"
    end
  end

  context "when type is important" do
    let(:type) { :important }

    it "renders an important callout" do
      render_inline(component) { "Example content" }
      expect(rendered_component).to have_selector ".cads-callout--important"
    end

    it "has expected badge" do
      render_inline(component) { "Example content" }
      expect(rendered_component).to have_selector ".cads-badge--important"
    end
  end

  context "when type is adviser" do
    let(:type) { :adviser }

    it "renders an adviser callout" do
      render_inline(component) { "Example content" }
      expect(rendered_component).to have_selector ".cads-callout--adviser"
    end

    it "has expected badge" do
      render_inline(component) { "Example content" }
      expect(rendered_component).to have_selector ".cads-badge--adviser"
    end
  end
end
