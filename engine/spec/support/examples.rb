# frozen_string_literal: true

FormOption = Data.define(:id, :name)
FormOptionGroup = Data.define(:name, :options)
DateLike = Data.define(:day, :month, :year)

class ExampleForm
  include ActiveModel::Model
  include ActiveModel::Attributes

  attribute :name
  attribute :address
  attribute :country, :string
  attribute :currency, :string
  attribute :date_of_purchase, :date
  attribute :confirmation, :boolean
  attribute :date_like_value

  validates :name, presence: true
  validates :address, presence: true
  validates :country, inclusion: { in: %w[GBP EUR USD] }
  validates :currency, inclusion: { in: %w[ZA SO DK FI] }
  validates :date_of_purchase, comparison: { less_than: Time.zone.today }
  validates :confirmation, presence: true

  def self.valid_example
    new(
      name: "Example name",
      address: "Example address",
      currency: "GBP",
      country: "DE",
      date_of_purchase: Date.new(2023, 1, 1),
      confirmation: true,
      date_like_value: DateLike.new(year: 2026, month: 11, day: 20)
    )
  end

  def self.invalid_example
    new(
      name: nil,
      address: nil,
      currency: "INVALID",
      country: "INVALID",
      date_of_purchase: Time.zone.tomorrow,
      confirmation: nil
    )
  end
end
