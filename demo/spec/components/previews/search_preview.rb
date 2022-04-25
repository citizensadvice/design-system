# frozen_string_literal: true

class SearchPreview < ViewComponent::Preview
  def example
    render(CitizensAdviceComponents::Search.new)
  end

  def with_value
    render(CitizensAdviceComponents::Search.new(value: "Current search term"))
  end
end
