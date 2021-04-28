# frozen_string_literal: true

module CitizensAdviceComponents
  class PaginationComponentPreview < ViewComponent::Preview
    # Using arguments allows us to have dynamic query parameters
    def with_dynamic_query_parameters(q: "debt and money", page: 1) # rubocop:disable Naming/MethodParameterName
      subject = CitizensAdviceComponents::PaginationComponent.new(
        current_params: { q: q, page: page },
        num_pages: 100,
        current_page: page.to_i
      )
      render(subject)
    end
  end
end
