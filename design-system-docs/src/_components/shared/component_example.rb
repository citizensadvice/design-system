# frozen_string_literal: true

require "htmlbeautifier"

module Shared
  class ComponentExample < ViewComponent::Base
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

    def iframe?
      example.data[:iframe].present?
    end

    def show_html?
      example.data[:show_html].present?
    end

    def show_source?
      example.data[:show_source].present?
    end

    def highlighted_source
      # @FIXME: There's probably some helper method to do this for us
      lexer = Rouge::Lexers::ERB.new
      formatter.format(lexer.lex(example.untransformed_content))
    end

    def highlighted_html
      lexer = Rouge::Lexers::HTML.new
      formatter.format(lexer.lex(beautified_content))
    end

    def beautified_content
      ::HtmlBeautifier.beautify(example.content)
    end

    def formatter
      Rouge::Formatters::HTML.new
    end

    def example_code_id
      example.data.title.downcase.parameterize
    end
  end
end
