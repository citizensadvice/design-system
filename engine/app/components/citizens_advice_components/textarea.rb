# frozen_string_literal: true

module CitizensAdviceComponents
  class Textarea < Input
    attr_reader :base_input_args

    def initialize(rows: 8, **args)
      @rows = rows
      @base_input_args = args.merge(type: nil)
      super(@base_input_args)
    end

    def base_input_attributes
      super.merge(rows: @rows)
    end
  end
end
