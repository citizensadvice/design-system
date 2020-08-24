# frozen_string_literal: true

RSpec::Matchers.define :have_all_correct_navigation_titles do
  match { |actual| actual == correct_titles }

  failure_message do |actual|
    "Expected:\n#{correct_titles}\nBut Selenium found:\n#{actual}"
  end

  def correct_titles
    [
      "Benefits",
      "Work",
      "Debt and money",
      "Consumer",
      "Housing",
      "Family",
      "Law and courts",
      "Immigration",
      "Health",
      "More from us"
    ]
  end
end

RSpec::Matchers.define :have_all_correct_footer_titles do
  match { |actual| actual == correct_titles }

  failure_message do |actual|
    "Expected:\n#{correct_titles}\nBut Selenium found:\n#{actual}"
  end

  def correct_titles
    [
      "Advice",
      "Resources and tools",
      "More from us",
      "About Citizens Advice"
    ]
  end
end
