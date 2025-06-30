# frozen_string_literal: true

module CitizensAdviceComponents
  class CheckboxSingle < Base
    attr_reader :name, :id, :error_message

    renders_one :checkbox, Checkable::Checkbox

    def initialize(name:, id: nil, error_message: nil)
      @name = name
      @id = id
      @error_message = error_message
    end

    def error?
      @error_message.present?
    end

    def error_id
      "#{name}-error"
    end

    def label_id
      checkbox.attributes(name, id)[:id]
    end

    def render?
      checkbox.present?
    end
  end
end
