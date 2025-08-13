# frozen_string_literal: true

class AppFooterComponent < ViewComponent::Base
  def call
    render CitizensAdviceComponents::Footer.new
  end
end
