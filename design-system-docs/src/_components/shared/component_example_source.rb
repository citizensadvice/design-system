# frozen_string_literal: true

module Shared
  class ComponentExampleSource < ViewComponent::Base
    include Bridgetown::ViewComponentHelpers

    def initialize(category, slug)
      super

      @category = category
      @slug = slug
      @site = Bridgetown::Current.site
    end

    def render?
      find_example.present?
    end

    def example
      example_resource = find_example
      # Make sure that rendered output is processed
      example_resource.transformer.process!
      example_resource
    end

    def find_example
      @site.collections.component_examples.resources.find do |resource|
        resource.data.categories.include?(@category.to_s) &&
          resource.data.slug == @slug.to_s
      end
    end

    def highlighted_source
      lexer = Rouge::Lexers::ERB.new
      formatter.format(lexer.lex(example.untransformed_content))
    end

    def formatter
      Rouge::Formatters::HTML.new
    end
  end
end
