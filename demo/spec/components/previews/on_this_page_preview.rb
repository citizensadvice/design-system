# frozen_string_literal: true

class OnThisPagePreview < ViewComponent::Preview
  def with_columns
    render CitizensAdviceComponents::OnThisPage.new do |c|
      c.with_links([
        { label: "Link 1", id: "link-1" },
        { label: "Link 2", id: "link-2" },
        { label: "Link 3", id: "link-3" },
        { label: "Link 4", id: "link-4" }
      ])
    end
  end

  def with_no_columns
    # Fewer than four links should not use multi-column layout
    render CitizensAdviceComponents::OnThisPage.new do |c|
      c.with_links([
        { label: "Link 1", id: "link-1" },
        { label: "Link 2", id: "link-2" },
        { label: "Link 3", id: "link-3" }
      ])
    end
  end

  def with_nested_links
    render CitizensAdviceComponents::OnThisPage.new(show_nested_links: true) do |c|
      c.with_links(links_nested)
    end
  end

  private

  def links
    [
      { label: "Link 1", id: "link-1" },
      { label: "Link 2", id: "link-2" },
      { label: "Link 3", id: "link-3" },
      { label: "Link 4", id: "link-4" }
    ]
  end

  def links_nested
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
end
