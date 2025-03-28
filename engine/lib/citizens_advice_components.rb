# frozen_string_literal: true

require "citizens_advice_components/engine"
require "citizens_advice_components/version"

module CitizensAdviceComponents
  def self.deprecator
    # https://api.rubyonrails.org/classes/ActiveSupport/Deprecation.html
    @deprecator ||= ActiveSupport::Deprecation.new("8.0", "CitizensAdviceComponents")
  end
end
