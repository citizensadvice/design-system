# frozen_string_literal: true

require "active_record/attribute_assignment"

module ExampleFormBuilder
  class DateField < WizardSteps::Step
    include ActiveModel::Attributes
    include ActiveRecord::AttributeAssignment

    attribute :date_of_birth, :date

    validates :date_of_birth, comparison: { less_than: Time.zone.today }
  end
end
