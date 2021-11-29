# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::ErrorSummary, type: :component do
  let(:errors) do
    [
      {
        href: "#name-input",
        message: "Enter your full name"
      }
    ]
  end

  let(:subject) do
    render_inline described_class.new do |c|
      c.errors(errors)
    end
  end

  it "renders the correct number of error messages" do
    expect(subject.css("a").length).to eq 1
  end

  it "renders the error message" do
    expect(subject.css("a").text.strip).to eq "Enter your full name"
  end

  it "renders the error message as a link to the provided href" do
    expect(subject.css("a").attribute("href").value).to eq("#name-input")
  end

  context "when there are no errors provided" do
    let(:errors) { nil }

    it "does not render the error summary" do
      expect(subject.css("[data-testid='error-summary']")).not_to be_present
    end
  end
end
