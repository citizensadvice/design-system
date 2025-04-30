# frozen_string_literal: true

module CitizensAdviceComponents
  class PageContent < Base
    renders_one :main
    renders_one :sidebar

    def initialize(full_width: false)
      @full_width = full_width
    end

    def full_width?
      @full_width && sidebar.blank?
    end
  end
end
