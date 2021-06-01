# frozen_string_literal: true

module CitizensAdviceComponents
  class TargetedContent < Base
    attr_reader :id, :type

    # rubocop:disable Metrics/MethodLength, Metrics/ParameterLists
    def initialize(
      title:,
      id:,
      type: :public,
      heading_level: nil,
      show_close_button: nil,
      is_toggleable: nil
    )
      super
      @title = title
      @id = id
      @type = fetch_or_fallback(
        allowed_values: %i[public adviser],
        given_value: type,
        fallback: :public
      )
      @heading_level = heading_level || 2
      @show_close_button = fetch_or_fallback_boolean(show_close_button, fallback: true)
      # Allow disabling toggleable behaviour (mostly for tests)
      @is_toggleable = fetch_or_fallback_boolean(is_toggleable, fallback: true)
    end
    # rubocop:enable Metrics/MethodLength, Metrics/ParameterLists

    def title
      @title.squish
    end

    def adviser?
      type == :adviser
    end

    def show_close_button?
      @show_close_button
    end

    def toggleable?
      @is_toggleable
    end

    def attributes # rubocop:disable Metrics/MethodLength
      {
        class: [
          ("cads-targeted-content--adviser" if adviser?),
          ("cads-no-close" unless show_close_button?),
          ("js-cads-targeted-content" if toggleable?)
        ],
        data: {
          descriptive_label_show: "#{t('.descriptive_label_show')}, #{title}",
          descriptive_label_hide: "#{t('.descriptive_label_hide')}, #{title}",
          close_label: t(".close_label")
        }
      }
    end

    def heading_level
      @heading_level.to_i.clamp(1, 6)
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
