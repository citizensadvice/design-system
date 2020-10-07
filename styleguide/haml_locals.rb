# frozen_string_literal: true

# frozen_string_literal => true

@locals = {
  "asset_hyperlink" => {
    "uri" => "//assets.ctfassets.net/vms0u05139aw/7ayjV8wUEBCqQOxaylJjxs/4b8214a762bf4e5b7b68a70bf0d1599d/test_pdf.pdf",
    "description" => "Test pdf",
    "size" => 6_444_516,
    "type" => "pdf"
  },
  "table_data" => {
    "caption" => "Post box collection times (Monday to Friday)",
    "header" => [
      "Your location",
      "Post box collection times"
    ],
    "rows" => [
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
  },
  "table_data_no_caption" => {
    "header" => [
      "Your location",
      "Post box collection times"
    ],
    "rows" => [
      [
        "City or town",
        "9am to 6.30pm"
      ],
      [
        "Rest of the UK",
        "9am to 5.30pm"
      ]
    ]
  },
  "table_data_long" => {
    "caption" => "Client under pension age",
    "header" => [
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
    ],
    "rows" => [
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
  },

  "alt_language" => {
    "url" => "?lang=cy",
    "title" => "Cymraeg"
  },

  "navigation_links" => [
    {
      "url" => "/benefits/",
      "title" => "Benefits"
    },
    {
      "url" => "/work/",
      "title" => "Work"
    },
    {
      "url" => "/debt-and-money/",
      "title" => "Debt and money"
    },
    {
      "url" => "/consumer/",
      "title" => "Consumer"
    },
    {
      "url" => "/housing/",
      "title" => "Housing"
    },
    {
      "url" => "/family/",
      "title" => "Family"
    },
    {
      "url" => "/law-and-courts/",
      "title" => "Law and courts"
    },
    {
      "url" => "/immigration/",
      "title" => "Immigration"
    },
    {
      "url" => "/health/",
      "title" => "Health"
    },
    {
      "url" => "/more",
      "title" => "More from us"
    }
  ],

  "breadcrumb_links" => [
    {
      "url" => "/benefits/",
      "title" => "Benefits"
    },
    {
      "url" => "/benefits/benefits-introduction/",
      "title" => "Benefits - introduction"
    },
    {
      "url" => "/benefits/benefits-introduction/what-benefits-can-i-get/",
      "title" => "Benefit calculators: what benefits can you get"
    }
  ],

  "notice" => {
    "type" => "important",
    "body" => <<~HTML
      <h3>This is the callout title</h3>
      <p>
        The important callout should be used for any important
        snippet of text that has serious and/or legal implications
        if the client does not follow the advice.
      </p>
    HTML
  },

  "root_path" => "root_path",
  "sign_in" => {
    "url" => "/sign-in/url",
    "text" => "Sign in"
  },
  "search_action_url" => "/the/search-action-url",

  "banner" => {
    "label" => "Notice banner title",
    "body" => <<~HTML
      <p>
        If you’re a Thomas Cook customer and you’re stuck abroad
        or want to get your money back, get help from the Civil Aviation Authority.
      </p>
    HTML
  },

  "radio" => {
    "name" => "radiogroup-1",
    "label" => "Select an option",
    "hint" => "There are two options",
    "options" => [
      { "value" => "opt1", "label" => "Option 1" },
      { "value" => "opt2", "label" => "Option 2" }
    ],
    "error_message" => "This is an error message",
    "has_error" => true,
    "optional" => true
  },

  "input" => {
    "name" => "inputABC",
    "label" => "This is the label for the input",
    "hint" => "This is the hint for the input",
    "error_message" => "This is an error messsage",
    "has_error" => true,
    "optional" => true
  },

  "contact_details" => <<~HTML,
    <p><strong>Bail for Immigration Detainees</strong></p>
    <p>Telephone: 01234 567890</p>
    <p>Monday to Thursday 8am to 1pm</p>
    <p>Calls cost a lot of money</p>
    <p><a href='http =>//link.to.the.website'>Link to the website</a></p>
  HTML

  "page_review_date" => "21 September 2019",

  "targetContent" => {
    "id" => "target-content-123",
    "title" => "If you are a citizen of a country outside the EU, EEA or Switzerland",
    "body" => <<~HTML
      <p>You should apply to the EU Settlement Scheme if both:</p>
      <ul>
        <li>you’re in the UK by 31 December 2020</li>
        <li>you have family in the UK from the EU, EEA or Switzerland</li>
      </ul>
      <p>
        You need to apply to the scheme even if you have a permanent residence card as
        it will not be valid after 31 December 2020.
      </p>
      <p>
        <a href="https =>//www.citizensadvice.org.uk/immigration/staying-in-the-uk-after-brexit/keeping-your-family-in-the-uk-after-brexit/">
        Check if you can apply to the EU Settlement Scheme</a>
      </p>
    HTML
  },

  "success_message" => "Thank you for your feedback",

  "related_content" => <<~HTML,
    <h3><a href="https://www.citizensadvice.org.uk">Search and navigation tools</a></h3>
    <ul>
      <li><a href="https://www.citizensadvice.org.uk">Search</a></li>
      <li><a href="https://www.citizensadvice.org.uk">A to Z of advice</a></li>
      <li><a href="https://www.citizensadvice.org.uk">Finding information</a></li>
      <li><a href="https://www.citizensadvice.org.uk">Search for your local Citizens Advice</a></li>
      <li><a href="https://www.citizensadvice.org.uk">Browse our campaign pages</a></li>
      <li><a href="https://www.citizensadvice.org.uk">Browse our research pages</a></li>
    </ul>
    <div class="cads-related-content__advisernet">
      <ul>
        <li><a href="https://www.citizensadvice.org.uk">Link 1</a></li>
        <li><a href="https://www.citizensadvice.org.uk">Link 2</a></li>
        <li><a href="https://www.citizensadvice.org.uk">Link 3</a></li>
        <li><a href="https://www.citizensadvice.org.uk">Link 4</a></li>
        <li><a href="https://www.citizensadvice.org.uk">Link 5</a></li>
        <li><a href="https://www.citizensadvice.org.uk">Link 6</a></li>
      </ul>
    </div>
  HTML

}
