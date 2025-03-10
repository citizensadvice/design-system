# frozen_string_literal: true

require "active_record/attribute_assignment"

class Person
  include ActiveModel::Model
  include ActiveModel::Attributes
  include ActiveRecord::AttributeAssignment

  attr_accessor :first_name, :last_name, :address, :date_with_hint, :required_date, :favourite_drink, :pizza_toppings, :ice_cream

  attribute :date_of_birth, :date
  attribute :pizza_toppings, array: true
  attribute :opted_in, :boolean
  attribute :account_active, :boolean, default: true

  validates :first_name, presence: true

  # Rails 7.1 provides a comparisson validator, but as we support Rails 6.1 use a simpler method as a check
  # validates :date_of_birth, comparison: { less_than: Time.zone.today }
  validates :date_of_birth, presence: true
  validate :date_must_be_in_the_past

  private

  def date_must_be_in_the_past
    errors.add(:date_of_birth, "can't be in the future!") if date_of_birth&.future?
  end
end
