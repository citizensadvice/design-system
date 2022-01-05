# frozen_string_literal: true

require "rails_helper"

RSpec.describe CitizensAdviceComponents::OnThisPage, type: :component do
  subject(:component) do
    render_inline described_class.new(show_nested_links: show_nested_links) do |c|
      c.links(links)
    end
  end

  let(:links) { nil }

  let(:simple_links) do
    [
      { label: "Link 1", id: "link-1" },
      { label: "Link 2", id: "link-2" },
      { label: "Link 3", id: "link-3" },
      { label: "Link 4", id: "link-4" }
    ]
  end

  let(:nested_links) do
    [
      { label: "Link 1", id: "link-1" },
      { label: "Link 2", id: "link-2", children: [
        { label: "Link 2.1", id: "link-2-1" },
        { label: "Link 2.2", id: "link-2-2" }
      ] },
      { label: "Link 3", id: "link-3" },
      { label: "Link 4", id: "link-4", children: [
        { label: "Link 4.1", id: "link-4-1" }
      ] },
      { label: "Link 5", id: "link-5" }
    ]
  end

  let(:show_nested_links) { false }

  context "when no links present" do
    it "will not render anything" do
      expect(component.children).to be_empty
    end
  end

  context "when there are links present" do
    let(:links) { simple_links }

    it "renders a list of top-level links" do
      links = component.css("[data-testid='on-this-page-link']")
      expect(links.map { |item| item.text.strip }).to eq [
        "Link 1",
        "Link 2",
        "Link 3",
        "Link 4"
      ]
    end

    it "does not render toggle buttons" do
      expect(component.at("[data-testid='on-this-page-toggle']")).to be_nil
    end

    it "does not render nested links" do
      expect(component.at("[data-testid='on-this-page-children']")).to be_nil
    end
  end

  context "when show_nested_links is true" do
    let(:show_nested_links) { true }

    context "when there are only top-level links present" do
      let(:body) { only_h2s }

      it "does not render toggle buttons" do
        expect(component.at("[data-testid='on-this-page-toggle']")).to be_nil
      end

      it "does not render nested links" do
        expect(component.at("[data-testid='on-this-page-children']")).to be_nil
      end
    end

    context "when there are nested links present" do
      let(:links) { nested_links }

      it "renders a list of top-level links" do
        links = component.css("[data-testid='on-this-page-link']")
        expect(links.map { |item| item.text.strip }).to eq [
          "Link 1",
          "Link 2",
          "Link 3",
          "Link 4",
          "Link 5"
        ]
      end

      it "renders nested links" do
        expect(component.at("[data-testid='on-this-page-children']")).not_to be_nil
      end

      it "renders the correct number of toggle buttons" do
        expect(component.css("[data-testid='on-this-page-toggle']").length).to eq(2)
      end
    end
  end
end
