# frozen_string_literal: true

module Shared
  class ComponentExample < ViewComponent::Base
    def initialize(category, slug)
      super

      @category = category
      @slug = slug
      @site = Bridgetown::Current.site
    end

    def render?
      example.present?
    end

    def example
      @example ||= ComponentExamplePresenter.find_example(
        site: @site,
        category: @category,
        slug: @slug
      )
    end
  end
end
