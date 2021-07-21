# frozen_string_literal: true

RSpec.shared_examples "breadcrumbs" do
  it "renders the correct number of breadcrumbs" do
    expect(component.css("li").length).to eq 3
  end

  it "renders the current page as a span" do
    expect(component.css("span").text.strip).to eq "Staying in the UK"
  end

  it "renders the current page with an aria-current of 'location' by default" do
    expect(component.css("span").attribute("aria-current").value).to eq "location"
  end

  it "renders the breadcrumbs in full width mode by default" do
    expect(component.css(".cads-breadcrumbs-wrapper")).to be_present
  end
end

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

  it_behaves_like "breadcrumbs"

  context "when no_collapse type is provided" do
    let(:type) { :no_collapse }

    it "renders the the non-collapsible version" do
      expect(component.css(".cads-breadcrumbs--no-collapse")).to be_present
    end
  end

  context "when no links are provided" do
    let(:links) { nil }

    it "does not render" do
      expect(component.css(".cads-breadcrumbs")).not_to be_present
    end
  end

  context "when no type is provided" do
    let(:type) { nil }

    it "renders collapsible version by default" do
      without_fetch_or_fallback_raises do
        expect(component.css(".cads-breadcrumbs--collapse")).to be_present
      end
    end
  end

  context "when not rendered on the current page" do
    let(:current_page) { false }

    it "does not add the aria-location attribute" do
      expect(component.css("span").attribute("aria-location")).to eq nil
    end
  end

  context "when not in full width mode" do
    let(:full_width) { false }

    it "does not wrap the component in the full width wrapper" do
      expect(component.css(".cads-breadcrumb-wrapper")).to be_empty
    end
  end

  context "when links are passed with the old style hash format" do
    let(:links) do
      [
        {
          "title" => "Home",
          "url" => "/"
        },
        {
          "title" => "Immigration",
          "url" => "/immigration"
        },
        {
          "title" => "Staying in the UK"
        }
      ]
    end

    it_behaves_like "breadcrumbs"
  end
end
