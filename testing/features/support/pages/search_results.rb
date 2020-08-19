# frozen_string_literal: true

class Search < SitePrism::Page
  sections :result_items, ".search-results > li" do
    element :title, "h3"
    element :link, "h3 > a em"
    element :description, ".description"
  end

  element :next_button, "button", text: "Next"
  element :previous_button, "button", text: "Previous"
  element :cookie_alert, ".hide-no-js .button--blue.cookie-monster__close"

  load_validation { remove_cookie_popup_if_present }

  def link_titles
    result_items.map { |result| result.title.text }
  end

  def link_for(text)
    result_for(text)&.link
  end

  def result_accuracy_scores
    result_items.map { |result| result.root_element["data-score"].to_f }
  end

  def sorted_result_accuracy_scores
    result_accuracy_scores.sort { |x, y| y <=> x }
  end

  private

  def result_for(text, page_switches: 3)
    page_switches.times do
      find_result_for(text).tap do |result|
        return result if result

        next_button.click
        sleep 0.8
      end
    end

    AutomationLogger.error("No result found for #{text} in #{page_switches} pages.")
  end

  def find_result_for(text)
    result_items.detect do |result|
      result.title.text == text
    end
  end

  def remove_cookie_popup_if_present
    return true unless has_cookie_alert?(wait: 2)

    cookie_alert.click
    AutomationLogger.debug("Cookie alert should now not show on any other page!")
  end
end
