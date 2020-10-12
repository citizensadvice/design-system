# frozen_string_literal: true

class String
  def pascalize
    split("_").map(&:capitalize).join
  end
end
