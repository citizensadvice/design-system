# frozen_string_literal: true

class TablePreview < ViewComponent::Preview
  def example
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
    render(
      CitizensAdviceComponents::Table.new(caption: caption, header: header, rows: rows)
    )
  end

  def no_caption
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
        "Rest of the UK",
        "9am to 5.30pm"
      ]
    ]
    render(CitizensAdviceComponents::Table.new(header: header, rows: rows))
  end

  def no_responsive_headers
    caption = "Office times"

    header = %w[Day Time]
    rows = [
      [
        "Monday",
        "9.15am to 5.15pm"
      ], [
        "Tuesday",
        "9.15am to 5.15pm"
      ], [
        "Wednesday",
        "9.15am to 5.15pm"
      ], [
        "Thursday",
        "9.15am to 5.15pm"
      ]
    ]

    render(CitizensAdviceComponents::Table.new(caption: caption, header: header, rows: rows, responsive_headers: false))
  end

  def long_table
    caption = "Client under pension age"
    header = [
      "Rate",
      "From April 2010",
      "From April 2011",
      "From April 2012",
      "From April 2013",
      "From April 2014",
      "From April 2015",
      "From April 2016",
      "From April 2017",
      "From April 2018",
      "From April 2019",
      "From April 2020",
      "From April 2021",
      "From April 2022",
      "From April 2023"
    ]
    rows = [
      [
        "Basic rate",
        "£79.45",
        "£80.25",
        "£82.65",
        "£84.65",
        "£86.10",
        "£87.10",
        "£88.10",
        "£89.10",
        "£90.10",
        "£91.10",
        "£92.10",
        "£90.10",
        "£91.10",
        "£92.10"
      ],
      [
        "Adult dependency increase",
        "£47.65",
        "£49.67",
        "£51.69",
        "£53.71",
        "£55.73",
        "£65.65",
        "£69.67",
        "£71.69",
        "£73.71",
        "£83.71",
        "£85.73",
        "£73.71",
        "£83.71",
        "£85.73"
      ],
      [
        "Earnings limit for adult dependant",
        "£48.15",
        "£50.27",
        "£52.39",
        "£54.41",
        "£56.53",
        "£58.15",
        "£60.27",
        "£62.39",
        "£64.41",
        "£64.51",
        "£66.53",
        "£64.41",
        "£64.51",
        "£66.53"
      ]
    ]

    subject = CitizensAdviceComponents::Table.new(header: header, rows: rows, caption: caption)

    render_with_template(locals: { subject: subject })
  end
end
