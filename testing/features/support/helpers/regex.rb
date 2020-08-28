# frozen_string_literal: true

module Helpers
  module Regex
    # This matches either a regular integer - i.e. `3` or a float i.e. `6.5`
    # Followed by either kb or mb
    #
    # (3).match?(file_size)     #=> true
    # (6.5).match?(file_size)   #=> true
    # (41.99).match?(file_size) #=> true
    #
    def file_size
      /^\d+.?\d*[k|m]b$/
    end
  end
end
