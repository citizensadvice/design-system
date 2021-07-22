# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Table, type: :component do
  subject(:component) do
    render_inline(
      described_class.new(
        header: header,
        rows: rows,
        caption: caption.presence
      )
    )
  end

  let(:header) do
    [
      "Your location",
      "Post box collection times"
    ]
  end

  let(:rows) do
    [
      [
        "City or town",
        "9am to 6.30pm"
      ],
      [
        "Areas with lots of businesses - known as commercial",
        "9am to 7.30pm"
      ],
      [
        "Very rural areas - for example, where there aren't many people",
        "9am to 4pm"
      ],
      [
        "Rest of the UK",
        "9am to 5.30pm"
      ]
    ]
  end

  let(:caption) { "I am a nice table" }

  it "renders correctly" do
    expect(component.to_html).to match_snapshot("table")
  end

  context "when there is no caption" do
    let(:caption) { nil }

    it "does not render a caption" do
      expect(component.css("table caption")).to be_empty
    end
  end
end
