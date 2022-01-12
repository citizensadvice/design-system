# frozen_string_literal: true

RSpec.describe DisclosureComponent, type: :component do
  let(:subject) do
    render_inline DisclosureComponent.new(
      closed_summary: closed_summary.presence,
      open_summary: open_summary.presence
    ).with_content(content.presence)
  end

  let(:closed_summary) { "View template letter" }
  let(:open_summary) { "Hide template letter" }
  let(:content) { "The disclosure content" }

  it "renders the closed summary text" do
    expect(subject.css("[data-label-when-hiding='View template letter']")).to be_present
  end

  it "renders the open summary text" do
    expect(subject.css("[data-label-when-showing='Hide template letter']")).to be_present
  end

  it "renders the disclosure content" do
    expect(subject.text.strip).to include "The disclosure content"
  end

  it "has aria-expand set to false on initial render" do
    expect(subject.css("[aria-expanded=false]")).to be_present
  end

  it "has aria-controls set to the id of the disclosure content" do
    expect(subject.css("[aria-controls=view-template-letter-disclosure-details]")).to be_present
  end

  context "when there is no open summary text" do
    let(:open_summary) { nil }

    it "shows the closed summary text when open" do
      expect(subject.css("[data-label-when-showing='View template letter']")).to be_present
    end
  end

  context "when there is no closed summary text" do
    let(:closed_summary) { nil }

    it "does not render" do
      expect(subject.children).to be_empty
    end
  end
end
