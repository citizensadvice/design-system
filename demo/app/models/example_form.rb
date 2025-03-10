# frozen_string_literal: true

require "active_record/attribute_assignment"

class ExampleForm
  include ActiveModel::Model
  include ActiveModel::Attributes
  include ActiveRecord::AttributeAssignment

  attr_accessor(
    :first_name,
    :last_name,
    :your_enquiry,
    :total_amount,
    :contacted_trader,
    :trader_response
  )

  attribute :date_of_purchase, :date

  validates(
    :first_name,
    presence: { message: "Enter your first name" }
  )

  validates(
    :last_name,
    presence: { message: "Enter your last name" }
  )

  validates(
    :your_enquiry,
    presence: { message: "Provide details of your complaint or enquiry" }
  )

  validates(
    :total_amount,
    presence: { message: "Tell us the total amount paid for the goods or services" }
  )

  validates(
    :date_of_purchase,
    presence: { message: "Tell us the date you purchased the goods or services" },
    comparison: { less_than: Time.zone.today, message: "Date of purchase must be in the past" }
  )

  validates(
    :contacted_trader,
    presence: { message: "Tell us if you have contacted the trader about this complaint" },
    inclusion: {
      in: %w[yes no],
      message: "Tell us if you have contacted the trader about this complaint"
    }
  )
end
