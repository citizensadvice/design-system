# frozen_string_literal: true

class PageLayoutComponent < ViewComponent::Base
  renders_one :main
  renders_one :sidebar
end
