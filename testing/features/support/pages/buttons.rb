# frozen_string_literal: true

module DesignSystem
  class Buttons < SitePrism::Page
    set_url "/iframe.html?id=3-components--buttons&viewMode=story"

    element :page_title, "h1"
    element :primary, "[type='button']:not(.cads-button)"
    element :secondary, "[type='button'].cads-button.cads-button__secondary"
    element :tertiary, "[type='button'].cads-button.cads-button__tertiary"
    element :initial_form, "#a11yComponentToTest"

    expected_elements :primary, :secondary, :tertiary

    load_validation do
      AutomationLogger.debug("Waiting for Buttons component.")
      [has_initial_form?(wait: 5), "Initial Buttons component didn't load correctly!"]
    end

    load_validation do
      [initial_properties, "Couldn't deduce initial button properties"]
    end

    def initial_properties
      @initial_properties ||=
        {
          primary: {
            background: primary.background_color,
            text: primary.color
          },
          secondary: {
            background: secondary.background_color,
            text: secondary.color
          },
          tertiary: {
            background: tertiary.background_color,
            text: tertiary.color
          }
        }
    end

    def background_color_of(button_name)
      send(button_name).background_color
    end

    def text_color_of(button_name)
      send(button_name).color
    end

    def font_weight_of(button_name)
      send(button_name).font_weight
    end

    def initial_background_color_of(button_name)
      initial_properties.dig(button_name.to_sym, :background)
    end

    def initial_text_color_of(button_name)
      initial_properties.dig(button_name.to_sym, :text)
    end
  end
end
