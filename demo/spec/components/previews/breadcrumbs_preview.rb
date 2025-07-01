# frozen_string_literal: true

class BreadcrumbsPreview < ViewComponent::Preview
  def collapsing
    render CitizensAdviceComponents::Breadcrumbs.new(
      sample_links,
      type: :collapse
    )
  end

  def not_collapsing
    render CitizensAdviceComponents::Breadcrumbs.new(
      sample_links,
      type: :no_collapse
    )
  end

  def long
    render CitizensAdviceComponents::Breadcrumbs.new(
      sample_links_long,
      type: :collapse
    )
  end

  def not_full_width
    render CitizensAdviceComponents::Breadcrumbs.new(
      [
        { title: "Immigration", url: "/immigration" },
        { title: "Staying in the UK" }
      ],
      type: :no_collapse,
      full_width: false
    )
  end

  def not_on_current_page
    render CitizensAdviceComponents::Breadcrumbs.new(
      sample_links,
      type: :no_collapse,
      current_page: false
    )
  end

  private

  def sample_links
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

  def sample_links_long
    [
      {
        title: "Home",
        url: "/"
      },
      {
        title: "My Grandmother Asked Me to Tell You She’s Sorry",
        url: "/immigration"
      },
      {
        title: "The Curious Incident of the Dog in the Night-Time",
        url: "/immigration/staying-in-the-uk"
      },
      {
        title: "Fried Green Tomatoes at the Whistle Stop Cafe",
        url: "/"
      },
      {
        title: "Eleanor Oliphant is Completely Fine"
      }
    ]
  end
end
