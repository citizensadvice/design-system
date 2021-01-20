# frozen_string_literal: true

module DesignSystem
  class SearchComponent < ViewComponent::Base
    attr_reader :action_url, :input_value

    def initialize(
      action_url:,
      input_value: nil
    )
      super
      @action_url = action_url
      @input_value = input_value
    end
  end
end
