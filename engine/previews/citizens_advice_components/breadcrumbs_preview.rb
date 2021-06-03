# frozen_string_literal: true

module CitizensAdviceComponents
  class BreadcrumbsPreview < ViewComponent::Preview
    def collapsing
      render(
        CitizensAdviceComponents::Breadcrumbs.new(
          type: :collapse,
          links: [
            {
              title: 'Home',
              url: '/'
            },
            {
              title: 'Immigration',
              url: '/immigration'
            },
            {
              title: 'Staying in the UK',
              url: '/immigration/staying-in-the-uk'
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
              title: 'Home',
              url: '/'
            },
            {
              title: 'Immigration',
              url: '/immigration'
            },
            {
              title: 'Staying in the UK',
              url: '/immigration/staying-in-the-uk'
            }
          ]
        )
      )
    end
  end
end
