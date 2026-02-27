# frozen_string_literal: true

require "active_record/attribute_assignment"

module Forms
  class DateField
    include ActiveModel::Model
    include ActiveModel::Attributes
    include ActiveRecord::AttributeAssignment

    attribute :date_field, :date
    attribute :date_field_hint, :date
    attribute :date_field_required, :date
    attribute :date_field_page_heading, :date

    validates :date_field_required, comparison: { less_than: Time.zone.today }

    def self.valid_example
      new(date_field_required: Time.zone.yesterday)
    end

    def self.invalid_example
      model = new(date_field_required: Time.zone.tomorrow)
      # Trigger validation to show error messages
      model.valid?
      model
    end
  end
end
