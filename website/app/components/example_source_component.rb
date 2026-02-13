# frozen_string_literal: true

class ExampleSourceComponent < ViewComponent::Base
  def initialize(category, slug)
    @category = category
    @slug = slug
  end

  def render?
    example.present?
  end

  def call
    tag.pre(class: "highlight", tabindex: "0") { source }
  end

  private

  def source
    tag.code { sanitize example.highlighted_source.strip }
  end

  def example
    @example ||= ComponentExample.find("#{@category}/#{@slug}")
  end
end
