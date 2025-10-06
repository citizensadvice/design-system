# frozen_string_literal: true

FormOption = Data.define(:id, :name)

class ExampleForm
  include ActiveModel::Model
  include ActiveModel::Attributes

  attribute :name
  attribute :address
  attribute :currency, :string
  attribute :date_of_purchase, :date
  attribute :confirmation, :boolean

  validates :name, presence: true
  validates :address, presence: true
  validates :currency, inclusion: { in: %w[GBP EUR USD] }
  validates :date_of_purchase, comparison: { less_than: Time.zone.today }
  validates :confirmation, presence: true

  def self.valid_example
    new(
      name: "Example name",
      address: "Example address",
      currency: "GBP",
      date_of_purchase: Date.new(2023, 1, 1),
      confirmation: true
    )
  end

  def self.invalid_example
    new(
      name: nil,
      address: nil,
      currency: "INVALID",
      date_of_purchase: Time.zone.tomorrow,
      confirmation: nil
    )
  end
end
