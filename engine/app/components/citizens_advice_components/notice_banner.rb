# frozen_string_literal: true

module CitizensAdviceComponents
  class NoticeBanner < Base
    attr_reader :label

    def initialize(label:)
      super
      @label = label
    end

    def render?
      content.present?
    end
  end
end
