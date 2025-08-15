# frozen_string_literal: true

require "active_record/attribute_assignment"

class ExampleForm
  include ActiveModel::Model
  include ActiveModel::Attributes
  include ActiveRecord::AttributeAssignment

  attribute :first_name, :string
  attribute :last_name, :string
  attribute :your_enquiry, :string
  attribute :total_amount, :string
  attribute :date_of_purchase, :date
  attribute :contacted_trader, :boolean
  attribute :trader_response, :string
  attribute :confirmation, :boolean

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :your_enquiry, presence: true
  validates :total_amount, presence: true
  validates :date_of_purchase, comparison: { less_than: Time.zone.today }
  validates :contacted_trader, presence: true
end
