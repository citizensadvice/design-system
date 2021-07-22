# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Pagination, type: :component do
  let(:subject) do
    component = described_class.new(
      current_params: { "q" => "debt and money" },
      num_pages: num_pages,
      current_page: current_page,
      param_name: param_name.presence
    )
    render_inline(component)
  end

  let(:num_pages) { 100 }
  let(:current_page) { 1 }
  let(:param_name) { nil }

  let(:paging_controls) { subject.css("[data-testid='paging-control']") }
  let(:paging_labels) { paging_controls.map { |item| item.text.strip } }
  let(:paging_aria_labels) { paging_controls.map { |item| item.attr("aria-label") } }

  context "when on first page" do
    let(:current_page) { 1 }

    it "has expected labels" do
      expect(paging_labels).to eq %w[1 2 3 Next Last]
    end

    it "has aria labels" do
      expect(paging_aria_labels).to eq [
        "Go to page 1",
        "Go to page 2",
        "Go to page 3",
        "Go to next page",
        "Go to last page"
      ]
    end

    it "generates valid query strings" do
      expect(paging_controls.first.attr("href")).to eq "?page=1&q=debt+and+money"
    end

    it "has aria-label for navigation" do
      expect(subject.at("nav").attr("aria-label")).to eq "Pagination navigation"
    end

    it "has single aria-current for current page" do
      expect(subject.css("[aria-current]:contains(1)").size).to be 1
    end
  end

  context "when on second page" do
    let(:current_page) { 2 }

    it "has expected labels" do
      expect(paging_labels).to eq %w[Previous 1 2 3 Next Last]
    end

    it "has aria labels" do
      expect(paging_aria_labels).to eq [
        "Go to previous page",
        "Go to page 1",
        "Go to page 2",
        "Go to page 3",
        "Go to next page",
        "Go to last page"
      ]
    end
  end

  context "when on tenth page" do
    let(:current_page) { 10 }

    it "has expected labels" do
      expect(paging_labels).to eq %w[First Previous 8 9 10 11 12 Next Last]
    end

    it "has aria labels" do
      expect(paging_aria_labels).to eq [
        "Go to first page",
        "Go to previous page",
        "Go to page 8",
        "Go to page 9",
        "Go to page 10",
        "Go to page 11",
        "Go to page 12",
        "Go to next page",
        "Go to last page"
      ]
    end
  end

  context "when on last page" do
    let(:current_page) { 100 }

    it "has expected labels" do
      expect(paging_labels).to eq %w[First Previous 98 99 100]
    end

    it "has aria labels" do
      expect(paging_aria_labels).to eq [
        "Go to first page",
        "Go to previous page",
        "Go to page 98",
        "Go to page 99",
        "Go to page 100"
      ]
    end
  end

  context "when welsh language" do
    before { I18n.locale = :cy }

    let(:current_page) { 10 }

    it "has translated labels" do
      expect(paging_labels).to eq %w[Cyntaf Blaenorol 8 9 10 11 12 Nesaf Diwethaf]
    end

    it "has translated aria labels" do
      expect(paging_aria_labels).to eq [
        "Ewch i'r dudalen gyntaf",
        "Ewch i'r dudalen flaenorol",
        "Ewch i dudalen 8",
        "Ewch i dudalen 9",
        "Ewch i dudalen 10",
        "Ewch i dudalen 11",
        "Ewch i dudalen 12",
        "Ewch i'r dudalen nesaf",
        "Ewch i'r dudalen olaf"
      ]
    end
  end

  context "when single page" do
    let(:current_page) { 1 }
    let(:num_pages) { 1 }

    it "does not render" do
      expect(subject.at("nav")).to be nil
    end
  end

  context "when custom param_name" do
    let(:param_name) { :page_number }

    it "generates valid query string" do
      expect(paging_controls.first.attr("href")).to eq "?page_number=1&q=debt+and+money"
    end
  end
end
