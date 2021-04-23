# frozen_string_literal: true

module DesignSystem
  class PaginationComponentPreview < ViewComponent::Preview
    # Using arguments allows us to have dynamic query parameters
    def with_dynamic_query_parameters(q: "debt and money", page: 1) # rubocop:disable Naming/MethodParameterName
      subject = DesignSystem::PaginationComponent.new(
        current_params: { q: q, page: page },
        num_pages: 100,
        current_page: page.to_i
      )
      render(subject)
    end

    def with_first_page
      subject = DesignSystem::PaginationComponent.new(
        current_params: { "q" => "debt and money" },
        num_pages: 100,
        current_page: 1
      )
      render(subject)
    end

    def with_second_page
      subject = DesignSystem::PaginationComponent.new(
        current_params: { "q" => "debt and money" },
        num_pages: 100,
        current_page: 2
      )
      render(subject)
    end

    def with_tenth_page
      subject = DesignSystem::PaginationComponent.new(
        current_params: { "q" => "debt and money" },
        num_pages: 100,
        current_page: 10
      )
      render(subject)
    end

    def with_last_page
      subject = DesignSystem::PaginationComponent.new(
        current_params: { "q" => "debt and money" },
        num_pages: 100,
        current_page: 100
      )
      render(subject)
    end
  end
end
