# frozen_string_literal: true

module CitizensAdviceComponents
  class CalloutComponent < ViewComponent::Base
    attr_reader :type, :title

    def initialize(type: nil, title: nil)
      super
      @type = type&.to_sym || :standard
      @title = title
    end

    def show_badge?
      type != :standard
    end

    def render?
      content.present?
    end
  end
end
