# frozen_string_literal: true

require "active_record/attribute_assignment"

class Person
  include ActiveModel::Model
  include ActiveModel::Attributes
  include ActiveRecord::AttributeAssignment

  attr_accessor :first_name, :last_name, :address, :date_with_hint, :required_date, :favourite_drink, :pizza_toppings, :ice_cream

  attribute :date_of_birth, :date
  attribute :purchase_date, :date
  attribute :pizza_toppings, array: true
  attribute :opted_in, :boolean
  attribute :account_active, :boolean, default: true

  validates :first_name, presence: true

  validates :date_of_birth, comparison: { less_than: Time.zone.today }
end
