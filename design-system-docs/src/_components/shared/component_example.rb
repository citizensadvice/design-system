# frozen_string_literal: true

require "htmlbeautifier"

module Shared
  class ComponentExample < ViewComponent::Base
    include Bridgetown::ViewComponentHelpers

    def initialize(slug, iframe: false)
      super

      @slug = slug
      @iframe = iframe
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
        resource.data.slug == @slug
      end
    end

    def iframe?
      @iframe.present?
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
  end
end
