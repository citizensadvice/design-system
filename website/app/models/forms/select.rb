# frozen_string_literal: true

module Forms
  class Select
    Option = Data.define(:name, :id)

    include ActiveModel::Model
    include ActiveModel::Attributes

    attribute :select
    attribute :select_hint
    attribute :select_required

    validates :select_required, presence: true, inclusion: { in: ->(select) { select.select_options.map(&:id) } }

    def select_options
      [
        Option.new(id: "tv_advert", name: "TV advert"),
        Option.new(id: "local_newspaper", name: "Local newspaper advert"),
        Option.new(id: "friend_family", name: "Friend/family recommendation"),
        Option.new(id: "internet", name: "Website / internet search")
      ]
    end

    def self.valid_example
      new(select_required: "tv_advert")
    end

    def self.invalid_example
      model = new(select_required: "invalid")
      # Trigger validation to show error messages
      model.valid?
      model
    end
  end
end
