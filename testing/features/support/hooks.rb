# frozen_string_literal: true

Before do |test_case|
  test_case.source_tag_names.include?("@small_screen") ? resize_window(320, 568) : resize_window
end
