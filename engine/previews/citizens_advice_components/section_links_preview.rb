# frozen_string_literal: true

module CitizensAdviceComponents
  class SectionLinksPreview < ViewComponent::Preview
    def example
      render CitizensAdviceComponents::SectionLinks.new(title: "Related Content") do |c|
        c.section_title(section_title)
        c.section_links(section_links)
      end
    end

    def with_additional_content
      render_with_template(
        locals: {
          section_title: section_title,
          section_links: section_links
        }
      )
    end

    private

    def section_title
      { title: "Applying to the EU settlement scheme", url: "/immigration#h-applying-to-the-eu-settlement-scheme" }
    end

    def section_links
      [
        { title: "Preparing to apply for pre-settled and settled status", url: "/immigration/preparing-to-apply-for-pre-settled-and-settled-status" },
        { title: "Applying for pre-settled and settled status", url: "/immigration/applying-for-settled-status" },
        { title: "Updating and proving your pre-settled or settled status", url: "/immigration/viewing-your-pre-settled-or-settled-status" },
        { title: "Switching from pre-settled to settled status", url: "/immigration/switching-from-pre-settled-to-settled-status" },
        { title: "Problems with your settled status decision", url: "/immigration/problems-with-your-settled-status-decision" }
      ]
    end
  end
end
