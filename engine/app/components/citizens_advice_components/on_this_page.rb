# frozen_string_literal: true

module CitizensAdviceComponents
  class OnThisPage < Base
    attr_accessor :headings

    renders_many :links, "Link"

    def initialize(show_nested_links: false)
      super
      @show_nested_links = show_nested_links
    end

    def render?
      links.present?
    end

    def component_class_names
      classes = ["cads-on-this-page"]
      if show_nested_links? && children_exist?
        classes << "js-cads-on-this-page"
        classes << "cads-on-this-page--expandable"
      elsif columns?
        classes << "cads-on-this-page--columns"
      end
      classes
    end

    def show_children_for?(link)
      show_nested_links? && link.children.present?
    end

    private

    def columns?
      links.size > 3
    end

    def show_nested_links?
      @show_nested_links
    end

    def children_exist?
      links.any?(&:children?)
    end

    class Link
      attr_reader :label, :id, :children

      def initialize(label:, id:, children: nil)
        @label = label
        @id = id
        @children = children
      end

      def children?
        @children.present?
      end
    end
  end
end
