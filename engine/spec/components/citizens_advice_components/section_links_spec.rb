# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::SectionLinks, type: :component do
  subject { page }

  context "with default arguments" do
    before do
      render_inline described_class.new(
        title: "Related Content",
        section_title: "Applying to the EU settlement scheme",
        section_title_url: "#"
      ) do |c|
        c.with_section_links(sample_section_links)
      end
    end

    it { is_expected.to have_selector "h2", text: "Related Content" }

    it { is_expected.to have_selector "h3", text: "Applying to the EU settlement scheme" }

    it "renders a link for each sibling" do
      expect(page).to have_selector "[data-testid='section-links-link']", count: sample_section_links.count
    end
  end

  context "when custom content slot is present" do
    before do
      render_inline described_class.new(
        title: "Related Content",
        section_title: "Applying to the EU settlement scheme",
        section_title_url: "#"
      ) do |c|
        c.with_section_links(additional_attribute_links)
        c.with_custom_content { "Example content" }
      end
    end

    it "renders the additional content" do
      expect(page).to have_content "Example content"
    end
  end

  describe "deprecated content block" do
    before do
      allow(CitizensAdviceComponents.deprecator).to receive(:warn)

      render_inline described_class.new(
        title: "Related Content",
        section_title: "Applying to the EU settlement scheme",
        section_title_url: "#"
      ) do |c|
        c.with_section_links(additional_attribute_links)
        "Example content"
      end
    end

    it "renders the additional content" do
      expect(page).to have_text "Example content"
    end

    it "logs deprecation warning" do
      expect(CitizensAdviceComponents.deprecator).to have_received(:warn)
        .with(/Use custom_content slot instead of default content block/)
    end
  end

  context "when additional link attributes are present" do
    before do
      render_inline described_class.new(title: "Related Content", section_title: "Applying to the EU settlement scheme") do |c|
        c.with_section_links(additional_attribute_links)
      end
    end

    it "renders the additional attributes" do
      expect(page).to have_selector "[data-testid='section-links-link'][aria-current='page']"
    end
  end

  context "when only section links are present" do
    before do
      render_inline described_class.new(title: nil, section_title: nil, section_title_url: nil) do |c|
        c.with_section_links(sample_section_links)
      end
    end

    it { is_expected.to have_selector ".cads-section-links" }
  end

  context "when only section title is present" do
    before do
      render_inline described_class.new(title: nil, section_title: "Applying to the EU settlement scheme", section_title_url: nil)
    end

    it { is_expected.to have_selector ".cads-section-links" }
  end

  context "when only content is present" do
    before do
      render_inline described_class.new(title: nil, section_title: nil, section_title_url: nil) do |c|
        c.with_custom_content { "Example content" }
      end
    end

    it { is_expected.to have_selector ".cads-section-links" }
  end

  context "when no section title url present" do
    before do
      render_inline described_class.new(title: "Related Content", section_title: "Applying to the EU settlement scheme") do |c|
        c.with_section_links(sample_section_links)
        c.with_custom_content { "Example content" }
      end
    end

    it "does not render section title as a link" do
      expect(page).not_to have_selector "[data-testid='section-title-link']"
    end
  end

  private

  def sample_section_links
    [
      { title: "Preparing to apply for pre-settled and settled status",
        url: "/immigration/preparing-to-apply-for-pre-settled-and-settled-status" },
      { title: "Applying for pre-settled and settled status", url: "/immigration/applying-for-settled-status" },
      { title: "Updating and proving your pre-settled or settled status", url: "/immigration/viewing-your-pre-settled-or-settled-status" },
      { title: "Switching from pre-settled to settled status", url: "/immigration/switching-from-pre-settled-to-settled-status" },
      { title: "Problems with your settled status decision", url: "/immigration/problems-with-your-settled-status-decision" }
    ]
  end

  def additional_attribute_links
    [
      { title: "Preparing to apply for pre-settled and settled status",
        url: "/immigration/preparing-to-apply-for-pre-settled-and-settled-status", "aria-current": "page" },
      { title: "Applying for pre-settled and settled status", url: "/immigration/applying-for-settled-status" },
      { title: "Updating and proving your pre-settled or settled status", url: "/immigration/viewing-your-pre-settled-or-settled-status" },
      { title: "Switching from pre-settled to settled status", url: "/immigration/switching-from-pre-settled-to-settled-status" },
      { title: "Problems with your settled status decision", url: "/immigration/problems-with-your-settled-status-decision" }
    ]
  end
end
