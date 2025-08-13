# frozen_string_literal: true

class ExampleSourceComponent < ViewComponent::Base
  def initialize(category, slug)
    @category = category
    @slug = slug
  end

  def render?
    example.present?
  end

  private

  def example
    @example ||= ComponentExample.find("#{@category}/#{@slug}")
  end
end
