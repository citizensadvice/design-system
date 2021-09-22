# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Table, type: :component do
  context "when missing headers" do
    subject(:component) do
      described_class.new(
        header: [],
        rows: [["Cell 1", "Cell 2"]]
      )
    end

    it "does not render" do
      render_inline component
      expect(rendered_component).to have_no_table
    end
  end

  context "when missing rows" do
    subject(:component) do
      described_class.new(
        header: ["Header 1", "Header 2"],
        rows: []
      )
    end

    it "does not render" do
      render_inline component
      expect(rendered_component).to have_no_table
    end
  end

  context "when valid table" do
    subject(:component) do
      described_class.new(
        header: ["Your location", "Post box collection times"],
        rows: [
          ["City or town", "9am to 6.30pm"],
          ["Areas with lots of businesses - known as commercial", "9am to 7.30pm"],
          ["Very rural areas - for example, where there aren't many people", "9am to 4pm"],
          ["Rest of the UK", "9am to 5.30pm"]
        ]
      )
    end

    it "matches snapshot" do
      expect(render_inline(component).to_html).to match_snapshot("table")
    end
  end

  context "when a caption is present" do
    subject(:component) do
      described_class.new(
        header: ["Header 1", "Header 1"],
        rows: [["Cell 1", "Cell 2"]],
        caption: "Example caption"
      )
    end

    it "renders a caption" do
      render_inline component
      expect(rendered_component).to have_css "caption", text: "Example caption"
    end
  end
end
