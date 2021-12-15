# frozen_string_literal: true
module CitizensAdviceComponents
  class OnThisPage < Base
    attr_accessor :headings

    def initialize(body: nil, links: nil, show_nested_links: false, endnotes: false)
      super
      @headings = []
      @body = body
      @show_nested_links = show_nested_links
      @endnotes = endnotes
      @links = links

      if @links.present?
        @headings = links
      else
        headings_to_show(body)
        puts "There"
      end
    end

    def render?
      (@body.present? && headings.any?) || @links.present?
    end

    def modifier_class_names
      if show_nested_links?
        "js-cads-on-this-page #{'cads-on-this-page--expandable' if @sub_headings}"
      elsif columns?
        "on-this-page--columns"
      end
    end

    def headings_to_show(body)
      return if body.blank?

      body["content"].each do |node|
        extract_heading(node)

        next if headings.empty?

        if heading_3_present?(node)
          heading_3_assignment(headings, node)
          @sub_headings = true
        end
      end

      link_to_endnotes if @endnotes
    end

    def link_to_endnotes
      endnotes = {
        label: "Endnotes",
        id: "endnotes",
        children: []
      }
      @headings << endnotes
    end

    def heading_2_present?(node)
      node["nodeType"] == "heading-2" && node["content"].present?
    end

    def heading_3_present?(node)
      node["nodeType"] == "heading-3" && !node["content"].empty?
    end

    def show_children_for?(entry)
     show_nested_links? && entry[:children].any?
    end

    private

    def heading_3_assignment(headings, node)
      headings.last[:children] << entry_for(node) if headings.present?
    end

    def columns?
      headings.size > 3
    end

    def extract_heading(node)
      return headings_to_show(node["content"]["body"]) if node["nodeType"] == "locationSpecificContent"

      headings << entry_for(node) if heading_2_present?(node)
    end

    def show_nested_links?
      @show_nested_links
    end

    def entry_for(node)
      value = node.dig("content", 0, "value")
      return if value.nil?

      {
        label: value,
        id: "h-#{value.parameterize}",
        children: []
      }
    end
  end
end
