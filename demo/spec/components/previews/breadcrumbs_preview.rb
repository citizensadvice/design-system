# frozen_string_literal: true

class BreadcrumbsPreview < ViewComponent::Preview
  def collapsing
    render(
      CitizensAdviceComponents::Breadcrumbs.new(
        type: :collapse,
        links: [
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
      )
    )
  end

  def not_collapsing
    render(
      CitizensAdviceComponents::Breadcrumbs.new(
        type: :no_collapse,
        links: [
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
      )
    )
  end

  def long
    render(
      CitizensAdviceComponents::Breadcrumbs.new(
        type: :collapse,
        links: [
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
      )
    )
  end

  def not_full_width
    render(
      CitizensAdviceComponents::Breadcrumbs.new(
        type: :no_collapse,
        full_width: false,
        links: [
          {
            title: "Immigration",
            url: "/immigration"
          },
          {
            title: "Staying in the UK"
          }
        ]
      )
    )
  end

  def not_on_current_page
    render(
      CitizensAdviceComponents::Breadcrumbs.new(
        type: :no_collapse,
        current_page: false,
        links: [
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
      )
    )
  end
end
