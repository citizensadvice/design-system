# frozen_string_literal: true

require "nokogiri"

module Shared
  class OnThisPage < ViewComponent::Base
    def initialize(source_doc)
      @doc = Nokogiri::HTML::DocumentFragment.parse(source_doc)
      @headings = extract_headings
    end

    def call
      render CitizensAdviceComponents::OnThisPage.new do |c|
        c.with_links(@headings)
      end
    end

    def render?
      @headings.size > 1
    end

    private

    def extract_headings
      headings_to_include.map do |node|
        {
          id: node["id"],
          label: CGI.escapeHTML(node.text)
        }
      end
    end

    def headings_to_include
      @doc.css("h2") - @doc.css(".component-example h2")
    end
  end
end
