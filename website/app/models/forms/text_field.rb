# frozen_string_literal: true

module Forms
  class TextField
    include ActiveModel::Model
    include ActiveModel::Attributes

    attribute :text_field
    attribute :text_field_hint
    attribute :text_field_password
    attribute :text_field_email, type: :email
    attribute :text_field_two_chars
    attribute :text_field_four_chars
    attribute :text_field_eight_chars
    attribute :text_field_sixteen_chars
    attribute :text_field_page_heading

    validates :text_field_email, format: { with: URI::MailTo::EMAIL_REGEXP }

    def self.valid_example
      new(
        text_field_email: "example@example.com"
      )
    end

    def self.invalid_example
      model = new(
        text_field_email: "invalid email"
      )

      # Trigger validation to show error messages
      model.valid?
      model
    end
  end
end
