# frozen_string_literal: true

module Helpers
  module Regex
    # This matches either a regular integer - i.e. `3` or a float i.e. `6.5`
    # Followed by either KB or MB (Must be upper-case to avoid confusing screen-readers)
    #
    # "3 MB".match?(file_size)      #=> true
    # "6.5 KB".match?(file_size)    #=> true
    # "41.919 MB".match?(file_size) #=> true
    # "41.919 AB".match?(file_size) #=> false
    #
    def file_size
      /^\d+.?\d* [K|M]B$/
    end
  end
end
