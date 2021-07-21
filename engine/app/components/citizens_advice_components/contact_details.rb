# frozen_string_literal: true

module CitizensAdviceComponents
  class ContactDetails < Base
    def call
      tag.div(content, class: "cads-contact-details")
    end

    def render?
      content.present?
    end
  end
end
