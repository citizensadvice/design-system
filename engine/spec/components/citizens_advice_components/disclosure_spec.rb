# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Disclosure, type: :component do
  subject(:component) do
    render_inline described_class.new(
      closed_summary: closed_summary.presence,
      open_summary: open_summary.presence
    ).with_content(content.presence)
  end

  let(:closed_summary) { "View template letter" }
  let(:open_summary) { "Hide template letter" }
  let(:content) { "The disclosure content" }

  it "renders the closed summary text" do
    expect(component.css("[data-label-when-hiding='View template letter']")).to be_present
  end

  it "renders the open summary text" do
    expect(component.css("[data-label-when-showing='Hide template letter']")).to be_present
  end

  it "renders the disclosure content" do
    expect(component.text.strip).to include "The disclosure content"
  end

  it "has aria-expand set to false on initial render" do
    expect(component.css("[aria-expanded=false]")).to be_present
  end

  it "has aria-controls set to the id of the disclosure content" do
    expect(component.css("[aria-controls=view-template-letter-disclosure-details]")).to be_present
  end

  context "when there is no open summary text" do
    let(:open_summary) { nil }

    it "shows the closed summary text when open" do
      expect(component.css("[data-label-when-showing='View template letter']")).to be_present
    end
  end

  context "when there is no closed summary text" do
    let(:closed_summary) { nil }

    it "does not render" do
      expect(component.children).to be_empty
    end
  end

  context "when there is no disclosure content" do
    subject(:component) do
      render_inline described_class.new(
        closed_summary: closed_summary.presence,
        open_summary: open_summary.presence
      )
    end

    it "does not render" do
      expect(component.at(".cads-disclosure")).not_to be_present
    end
  end
end
