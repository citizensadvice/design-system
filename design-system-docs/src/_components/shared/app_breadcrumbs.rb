# frozen_string_literal: true

module Shared
  class AppBreadcrumbs < ViewComponent::Base
    include Bridgetown::ViewComponentHelpers

    def initialize(resource)
      @resource = resource
    end

    def call
      render CitizensAdviceComponents::Breadcrumbs.new(links: build_links)
    end

    def build_links
      [{ title: "Home", url: "/" }]
        .concat(@resource.layout.data.extra_breadcrumbs.to_a)
        .concat(@resource.data.extra_breadcrumbs.to_a)
        .push({ title: @resource.data.title }).compact
    end

    def render?
      @resource.data.slug != "index"
    end
  end
end
