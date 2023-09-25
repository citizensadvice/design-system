# frozen_string_literal: true

module Shared
  class PageLayout < ViewComponent::Base
    renders_one :main
    renders_one :sidebar
  end
end
