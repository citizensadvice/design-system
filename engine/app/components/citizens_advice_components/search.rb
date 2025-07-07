# frozen_string_literal: true

module CitizensAdviceComponents
  class Search < Base
    attr_reader :value, :param_name

    def initialize(value: nil, param_name: nil)
      @value = value
      @param_name = param_name || :q
    end
  end
end
