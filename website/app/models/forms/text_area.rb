# frozen_string_literal: true

module Forms
  class TextArea
    include ActiveModel::Model
    include ActiveModel::Attributes

    attribute :text_area
    attribute :text_area_hint
    attribute :text_area_required
    attribute :text_area_rows
    attribute :text_area_page_heading

    validates :text_area_required, presence: true

    def self.valid_example
      new(text_area_required: "Example text")
    end

    def self.invalid_example
      model = new(text_area_required: nil)
      # Trigger validation to show error messages
      model.valid?
      model
    end
  end
end
