# frozen_string_literal: true

require "active_record/attribute_assignment"

module Forms
  class ErrorSummary
    include ActiveModel::Model
    include ActiveModel::Attributes
    include ActiveRecord::AttributeAssignment

    attribute :name, :string
    attribute :email, :string
    attribute :total_amount, :string
    attribute :date_of_birth, :date

    validates :name, presence: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :date_of_birth, comparison: { less_than: Time.zone.today }

    def self.valid_example
      new(
        name: "Example name",
        email: "example@example.com",
        date_of_birth: Date.new(1980, 10, 10)
      )
    end

    def self.invalid_example
      model = new(
        email: "invalid",
        date_of_birth: Time.zone.today
      )

      # Trigger validation to show error messages
      model.valid?
      model
    end
  end
end
