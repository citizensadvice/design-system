# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Pagination, type: :component do
  subject { page }

  context "when multiple pages" do
    before do
      render_inline described_class.new(
        current_params: { "q" => "debt and money" },
        num_pages: 100,
        current_page: current_page
      )
    end

    context "when on first page" do
      let(:current_page) { 1 }

      it { is_expected.to have_selector "a", count: 5 }
      it { is_expected.to have_selector "a[aria-current]", count: 1 }

      it { is_expected.to have_link "1", href: "?page=1&q=debt+and+money" }
      it { is_expected.to have_link "2", href: "?page=2&q=debt+and+money" }
      it { is_expected.to have_link "3", href: "?page=3&q=debt+and+money" }
      it { is_expected.to have_link "Next", href: "?page=2&q=debt+and+money" }
      it { is_expected.to have_link "Last", href: "?page=100&q=debt+and+money" }

      it "has aria labels" do
        expect(paging_aria_labels).to eq [
          "Go to page 1",
          "Go to page 2",
          "Go to page 3",
          "Go to next page",
          "Go to last page"
        ]
      end

      it { is_expected.to have_selector "nav[aria-label='Pagination navigation']" }
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
  end

  context "when welsh language" do
    around { |example| I18n.with_locale(:cy) { example.run } }

    before do
      render_inline described_class.new(
        current_params: { "q" => "debt and money" },
        num_pages: 100,
        current_page: 10
      )
    end

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
    before do
      render_inline described_class.new(
        current_params: { "q" => "debt and money" },
        num_pages: 1,
        current_page: 1
      )
    end

    it { is_expected.to have_no_selector "nav" }
  end

  context "when custom param_name" do
    before do
      render_inline described_class.new(
        current_params: { "q" => "debt and money" },
        num_pages: 100,
        current_page: 1,
        param_name: :page_number
      )
    end

    it { is_expected.to have_link "1", href: "?page_number=1&q=debt+and+money" }
  end

  private

  def paging_labels
    paging_controls.map { |item| item.native.text.strip }
  end

  def paging_aria_labels
    paging_controls.map { |item| item.native["aria-label"] }
  end

  def paging_controls
    page.all("[data-testid='paging-control']")
  end
end
