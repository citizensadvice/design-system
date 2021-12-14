# frozen_string_literal: true

require "rails_helper"

RSpec.describe OnThisPageComponent, type: :component do

  let(:show_nested_links) { false }
  let(:endnotes) { false }

  let(:subject) do
    component = OnThisPageComponent.new(
      body: body,
      show_nested_links: show_nested_links,
      endnotes: endnotes
    )
    render_inline(component)
  end

  context "when no body present" do
    let(:body) { nil }

    it "will not render anything" do
      expect(subject.children).to be_empty
    end
  end

  context "when no headings present" do
    let(:body) { no_h2s }

    it "will not render anything" do
      expect(subject.children).to be_empty
    end
  end

  context "when there are headings present" do
    let(:body) { only_h2s }

    it "renders a list of top-level headings" do
      links = subject.css("[data-testid='on-this-page-link']")
      expect(links.map { |item| item.text.strip }).to eq [
        "An example level 2 heading",
        "A second level 2 heading example",
        "One more level 2 heading example"
      ]
    end

    it "does not render child links" do
      expect(subject.at("[data-testid='on-this-page-toggle']")).to be_nil
      expect(subject.at("[data-testid='on-this-page-children']")).to be_nil
    end
  end

  context "when show_nested_links is true" do
    let(:show_nested_links) { true }

    context "when there are only top-level headings present" do
      let(:body) { only_h2s }

      it "does not render child links" do
        expect(subject.at("[data-testid='on-this-page-toggle']")).to be_nil
        expect(subject.at("[data-testid='on-this-page-children']")).to be_nil
      end
    end

    context "when there are multiple heading levels present" do
      let(:body) { nested_h3s }

      it "renders a list of top-level headings" do
        links = subject.css("[data-testid='on-this-page-link']")
        expect(links.map { |item| item.text.strip }).to eq [
          "An example level 2 heading",
          "A second level 2 heading example",
          "One more level 2 heading example"
        ]
      end

      it "renders child links" do
        links = subject.css("[data-testid='on-this-page-child-link']")
        expect(links.map { |item| item.text.strip }).to eq ["A level 3 heading"]
        expect(subject.at("[data-testid='on-this-page-toggle']")).to_not be_nil
      end
    end

    context "when the first heading is not an h2" do
      let(:body) { first_heading_h3 }

      it "renders a list of top-level headings" do
        links = subject.css("[data-testid='on-this-page-link']")
        expect(links.map { |item| item.text.strip }).to eq [
          "An example level 2 heading",
          "A second level 2 heading example",
          "One more level 2 heading example"
        ]
      end

      it "renders child links" do
        links = subject.css("[data-testid='on-this-page-child-link']")
        expect(links.map { |item| item.text.strip }).to eq ["An example level 3 heading"]
        expect(subject.at("[data-testid='on-this-page-toggle']")).to_not be_nil
      end
    end

    context "when there is location_specific_content" do
      let(:location_specific_content) { JSON.parse(file_fixture("on_this_page_first_location_specific_content.json").read) }
      let(:body) { location_specific_content }

      context "with nested h2 headers" do
        it "renders the nested headers" do
          links = subject.css("[data-testid='on-this-page-link']")
          expect(links.map { |item| item.text.strip }).to eq ["A nested level 2 heading"]
        end
      end

      context "with nested h2 and h3 headers" do
        let(:location_specific_content) { JSON.parse(file_fixture("on_this_page_first_location_specific_content_multiple_headings.json").read) }
        let(:expected_h2_headings) { ["A nested level 2 heading", "Another nested level 2 heading", "An example level 2 heading, outside of locationSpecificContent"] }
        let(:expected_h3_headings) { ["A nested level 3 heading", "Another nested level 3 heading", "A nested level 3 heading in a locationSpecificContent which does not include a h2"] }

        it "renders the nested headers" do
          links = subject.css("[data-testid='on-this-page-link']")
          child_links = subject.css("[data-testid='on-this-page-child-link']")

          expect(links.map { |item| item.text.strip }).to eq expected_h2_headings
          expect(child_links.map { |item| item.text.strip }).to eq expected_h3_headings
        end
      end

      context "with a normal h2 and h3 inside locationSpecificContent" do
        let(:location_specific_content) { JSON.parse(file_fixture("on_this_page_first_location_specific_content_nested_h3_only.json").read) }
        let(:expected_h2_headings) { ["An example level 2 heading, outside of locationSpecificContent"] }
        let(:expected_h3_headings) { ["A nested level 3 heading in a locationSpecificContent which does not include a h2"] }

        it "renders the nested headers" do
          links = subject.css("[data-testid='on-this-page-link']")
          child_links = subject.css("[data-testid='on-this-page-child-link']")

          expect(links.map { |item| item.text.strip }).to eq expected_h2_headings
          expect(child_links.map { |item| item.text.strip }).to eq expected_h3_headings
        end
      end
    end

    context "when there is an empty header" do
      let(:body) { empty_heading }

      it "renders when there is an empty heading" do
        links = subject.css("[data-testid='on-this-page-child-link']")
        expect(subject.text.strip).to include "An example level 2 heading"
        expect(subject.text.strip).to include "A level 3 heading"
        expect(links.count).to eq 1
      end
    end
  end

  context "when in welsh language" do
    before { I18n.locale = :cy }
    let(:body) { only_h2s }

    it "has a translated title" do
      expect(subject.at("h2").text).to eq "Ar y dudalen hon"
    end
  end

  context "when there are endnotes present" do
    let(:endnotes) { true }
    let(:body) { only_h2s }
    it "includes a link to endnotes" do
      links = subject.css("[data-testid='on-this-page-link']")
      expect(links.last.text.strip).to eq("Endnotes")
    end
  end

  context "when there are no endnotes present" do
    let(:body) { only_h2s }
    it "does not include a link to endnotes" do
      links = subject.css("[data-testid='on-this-page-link']")
      expect(links.last.text.strip).to_not eq("Endnotes")
    end
  end
end
