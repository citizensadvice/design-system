# frozen_string_literal: true

module CitizensAdviceComponents
  class TargetedContent < Base
    attr_reader :id, :type

    def initialize(
      title:,
      id:,
      type: :public,
      heading_level: nil,
      show_close_button: nil
    )
      super
      @title = title
      @id = id
      @type = fetch_or_fallback(allowed_values: %i[public adviser], given_value: type, fallback: :public)
      @heading_level = heading_level || 2
      @show_close_button = fetch_or_fallback_boolean(show_close_button, fallback: true)
    end

    def title
      @title.squish
    end

    def heading_level
      @heading_level.to_i.clamp(2, 6)
    end

    def adviser?
      type == :adviser
    end

    def show_close_button?
      @show_close_button
    end

    def attributes
      {
        class: [
          ("cads-targeted-content--adviser" if adviser?),
          ("cads-no-close" unless show_close_button?)
        ],
        data: {
          descriptive_label_show: "#{t('citizens_advice_components.targeted_content.descriptive_label_show')}, #{title}",
          descriptive_label_hide: "#{t('citizens_advice_components.targeted_content.descriptive_label_hide')}, #{title}",
          close_label: t("citizens_advice_components.targeted_content.close_label")
        }
      }
    end

    def heading_attributes
      {
        id: "h-#{id}",
        class: %w[cads-targeted-content__title js-cads-targeted-content__title],
        data: { testid: "targeted-content-title" }
      }
    end

    def render?
      content.present?
    end
  end
end
