# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::ErrorSummary, type: :component do
  subject(:component) do
    render_inline described_class.new do |c|
      c.errors(errors)
    end
  end

  let(:errors) do
    [
      {
        href: "#name-input",
        message: "Enter your full name"
      }
    ]
  end

  it "renders the correct number of error messages" do
    expect(component.css("a").length).to eq 1
  end

  it "renders the error message" do
    expect(component.css("a").text.strip).to eq "Enter your full name"
  end

  it "renders the error message as a link to the provided href" do
    expect(component.css("a").attribute("href").value).to eq("#name-input")
  end

  context "when there are no errors provided" do
    let(:errors) { nil }

    it "does not render the error summary" do
      expect(component.css("[data-testid='error-summary']")).not_to be_present
    end
  end
end
