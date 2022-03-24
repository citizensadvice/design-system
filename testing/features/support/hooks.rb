# frozen_string_literal: true

Before do |test_case|
  if test_case.source_tag_names.include?("@small_screen")
    Capybara.current_window.resize_to(320, 568)
  else
    Capybara.current_window.resize_to(1280, 800)
  end
end
