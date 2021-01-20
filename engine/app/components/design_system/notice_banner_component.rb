# frozen_string_literal: true

module DesignSystem
  class NoticeBannerComponent < ViewComponent::Base
    attr_reader :label, :body

    def initialize(label:, body:)
      super
      @label = label
      @body = body
    end
  end
end
