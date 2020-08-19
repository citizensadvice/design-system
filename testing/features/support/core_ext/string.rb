# frozen_string_literal: true

class String
  def camelize
    split("_").map(&:capitalize).join
  end
end
