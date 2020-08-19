# frozen_string_literal: true

RSpec::Matchers.define :have_all_correct_navigation_titles do
  match do |actual|
    actual ==
      [
        "Benefits",
        "Work",
        "Debt and money",
        "Consumer",
        "Housing",
        "Family",
        "Law and courts",
        "Immigration",
        "Health"
      ]
  end
end

RSpec::Matchers.define :have_all_correct_footer_titles do
  match do |actual|
    actual ==
      [
        "Advice",
        "Resources and tools",
        "More from us",
        "About Citizens Advice"
      ]
  end
end

RSpec::Matchers.define :have_all_correct_breadcrumbs do
  match do |actual|
    actual ==
      %w[
        Home
        Immigration
      ]
  end
end
