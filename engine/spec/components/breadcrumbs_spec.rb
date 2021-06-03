# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Breadcrumbs, type: :component do
  subject(:component) do
    render_inline(
      described_class.new(
        type: type.presence,
        links: links.presence
      )
    )
  end

  let(:type) { :collapse }
  let(:links) do
    [
      {
        title: "Home",
        url: "/"
      },
      {
        title: "Immigration",
        url: "/immigration"
      },
      {
        title: "Staying in the UK"
      }
    ]
  end

  it "renders the correct number of breadcrumbs" do
    expect(component.css("li").length).to eq 3
  end

  it "renders the current page as a span" do
    expect(component.css("span").text.strip).to eq "Staying in the UK"
  end

  it "renders the current page with an aria-current of 'location'" do
    expect(component.css("span").attribute("aria-current").value).to eq "location"
  end

  context "no_collapse type is provided" do
    let(:type) { :no_collapse }

    it "renders the the non-collapsible version" do
      expect(component.css(".cads-breadcrumbs--no-collapse")).to be_present
    end
  end

  context "no links are provided" do
    let(:links) { nil }

    it "does not render" do
      expect(component.css(".cads-breadcrumbs")).to_not be_present
    end
  end

  context "no type is provided" do
    let(:type) { nil }

    context "production rails env" do
      before do
        allow(Rails.env).to receive(:production?).and_return(true)
      end

      it "renders collapsible version by default" do
        expect(component.css(".cads-breadcrumbs--collapse")).to be_present
      end
    end
  end
end
