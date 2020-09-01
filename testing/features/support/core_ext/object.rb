# frozen_string_literal: true

class Object
  def blank?
    nil? || empty?
  end
end
