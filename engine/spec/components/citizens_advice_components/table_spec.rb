# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Table, type: :component do
  let(:sample_header) do
    ["Your location", "Post box collection times"]
  end

  let(:sample_rows) do
    [
      ["City or town", "9am to 6.30pm"],
      ["Areas with lots of businesses - known as commercial", "9am to 7.30pm"],
      ["Very rural areas - for example, where there aren't many people", "9am to 4pm"],
      ["Rest of the UK", "9am to 5.30pm"]
    ]
  end

  context "when missing headers" do
    subject(:component) do
      described_class.new(header: [], rows: sample_rows)
    end

    it "does not render" do
      render_inline component
      expect(rendered_content).to have_no_table
    end
  end

  context "when missing rows" do
    subject(:component) do
      described_class.new(header: sample_header, rows: [])
    end

    it "does not render" do
      render_inline component
      expect(rendered_content).to have_no_table
    end
  end

  context "when valid table" do
    subject(:component) do
      described_class.new(
        header: sample_header,
        rows: sample_rows
      )
    end

    it "matches snapshot" do
      expect(render_inline(component).to_html).to match_snapshot("table")
    end
  end

  context "when a caption is present" do
    subject(:component) do
      described_class.new(
        header: sample_header,
        rows: sample_rows,
        caption: "Example caption"
      )
    end

    it "renders a caption" do
      render_inline component
      expect(rendered_content).to have_css "caption", text: "Example caption"
    end
  end

  context "when additional empty rows" do
    subject(:component) do
      described_class.new(
        header: sample_header,
        rows: sample_rows.concat([["", ""], [nil, nil], ["", nil]])
      )
    end

    it "strips empty rows" do
      expect(render_inline(component).to_html).to match_snapshot("table")
    end
  end
end
