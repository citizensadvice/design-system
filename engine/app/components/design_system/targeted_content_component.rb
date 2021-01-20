# frozen_string_literal: true

module DesignSystem
  class TargetedContentComponent < ViewComponent::Base
    attr_reader :id, :title, :body, :is_toggleable

    def initialize(id:, title:, body:, is_toggleable: true)
      super

      @id = id
      @title = title
      @body = body
      @is_toggleable = is_toggleable
    end
  end
end
