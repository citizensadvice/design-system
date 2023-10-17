# frozen_string_literal: true

class ExampleForm
  include ActiveModel::Model

  attr_accessor(
    :first_name,
    :last_name,
    :your_enquiry,
    :total_amount,
    :date_of_purchase,
    :contacted_trader,
    :trader_response
  )

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
    presence: { message: "Tell us the date you purchased the goods or services" }
  )

  validates(
    :contacted_trader,
    presence: { message: "Tell us if you have contacted the trader about this complaint" },
    inclusion: {
      in: %w[yes no],
      message: "Tell us if you have contacted the trader about this complaint"
    }
  )

  def formatted_errors
    errors.attribute_names.map do |attr|
      { href: id_for(attr), message: errors[attr].first }
    end
  end

  private

  def id_for(attr)
    case attr
    when :contacted_trader
      "##{attr}-0"
    else
      "##{attr}-input"
    end
  end
end
