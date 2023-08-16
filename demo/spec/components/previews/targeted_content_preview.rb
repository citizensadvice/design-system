# frozen_string_literal: true

class TargetedContentPreview < ViewComponent::Preview
  def default; end

  def anchor; end

  def adviser
    caption = "Post box collection times (Monday to Friday)"
    header = [
      "Your location",
      "Post box collection times"
    ]

    rows = [
      [
        "City or town",
        "9am to 6.30pm"
      ],
      [
        "Areas with lots of businesses - known as commercial",
        "9am to 7.30pm"
      ],
      [
        "Very rural areas - for example, where there aren't many people",
        "9am to 4pm"
      ],
      [
        "Rest of the UK",
        "9am to 5.30pm"
      ]
    ]

    render_with_template(locals: { header:, rows:, caption: })
  end
end
