# frozen_string_literal: true

require "htmlbeautifier"

module Shared
  class ComponentExamplePresenter
    def self.find_example(site:, category:, slug:)
      example = site.collections.component_examples.resources.find do |resource|
        resource.data.categories.include?(category.to_s) &&
          resource.data.slug == slug.to_s
      end
      new(example) if example.present?
    end

    attr_reader :example

    def initialize(raw_example)
      @example = raw_example
      # Make sure that rendered output is processed
      @example.transformer.process!
    end

    def data
      example.data
    end

    def content
      example.content
    end

    def relative_url
      example.relative_url
    end

    def title
      data[:title]
    end

    def id
      title.downcase.parameterize
    end

    def form?
      data[:form].present?
    end

    def iframe?
      data[:iframe].present?
    end

    def show_html?
      data[:show_html].present?
    end

    def show_source?
      data[:show_source].present?
    end

    def highlighted_source
      lexer = Rouge::Lexers::ERB.new
      formatter.format(lexer.lex(example.untransformed_content))
    end

    def highlighted_html
      lexer = Rouge::Lexers::HTML.new
      beautified_content = ::HtmlBeautifier.beautify(example.content)
      formatter.format(lexer.lex(beautified_content))
    end

    private

    def formatter
      Rouge::Formatters::HTML.new
    end
  end
end
