# frozen_string_literal: true

@locals = {
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

  "header" => {
    "root_path" => "#",
    "links" => [{"title" => "Public site", "url" => "/", "current_site" => true}, { "title" => "AdviserNet", "url" => "?advisernet"}, {"title" => "CABlink", "url" => "?CABlink"}, {"title" => "BMIS", "url" => "?BMIS"}, { "title" => "Cymraeg", "url" => "?lang=cy" }],
    "sign_in_out" => { "title" => "Sign out", "url" => "/sign-out/out" },
    "search_action_url" => "/search",
    "homepage_url" => "/"
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

  "footer" => {
    "feedback_url" => "https://www.research.net/r/J8PLH2H",
    "homepage_url" => "/",
    "links" => {
      "column_one" => {
        "title" => "Advice",
        "links" => [
          { "url" => "/benefits/", "label" => "Benefits" },
          { "url" => "/work/", "label" => "Work" },
          { "url" => "/debt-and-money/", "label" => "Debt and Money" },
          { "url" => "/consumer/", "label" => "Consumer" },
          { "url" => "/family/", "label" => "Family" },
          { "url" => "/housing/", "label" => "Housing" },
          { "url" => "/law-and-courts/", "label" => "Law and courts" },
          { "url" => "/immigration/", "label" => "Immigration" },
          { "url" => "/health/", "label" => "Health" }
        ]
      },
      "column_two" => {
        "title" => "Resources and tools",
        "links" => [
          { "url" => "/about-us/how-citizens-advice-works/products-and-services/adviser-resources/", "label" => "Advisor resources" },
          { "url" => "/about-us/how-we-provide-advice/our-prevention-work/education/", "label" => "Education resources" },
          { "url" => "/resources-and-tools/about-this-site/accessibility/", "label" => "Accessibility" },
          { "url" => "/resources-and-tools/about-this-site/accessibility/", "label" => "Site search" },
          { "url" => "/resources-and-tools/search-navigation-tools/a-to-z-of-advice/", "label" => "A-Z of advice" }
        ]
      },
      "column_three" => {
        "title" => "More from us",
        "links" => [
          { "url" => "/about-us/", "label" => "About us" },
          { "url" => "/about-us/how-citizens-advice-works/who-we-are-and-what-we-do/annual-reports/", "label" => "Annual reports" },
          { "url" => "/about-us/contact-us/contact-us/contact-us/", "label" => "Contact us" },
          { "url" => "/about-us/contact-us/contact-us/make-a-complaint-about-us/", "label" => "Complaints" },
          { "url" => "/about-us/how-citizens-advice-works/media/", "label" => "Media" },
          { "url" => "/about-us/policy/", "label" => "Policy reseach" },
          { "url" => "/about-us/support-us/", "label" => "Support us" },
          { "url" => "/about-us/support-us/volunteering/", "label" => "Volunteering" },
          { "url" => "/about-us/how-citizens-advice-works/job-and-voluntary-opportunities/", "label" => "Jobs" }
        ]
      },
      "column_four" => {
        "title" => "About Citizens Advice",
        "links" => [
          { "url" => "/about-us/how-we-provide-advice/", "label" => "How we provide advice" },
          { "url" => "/about-us/difference-we-make/", "label" => "The difference we make" },
          { "url" => "/about-us/support-us/", "label" => "Support us" },
          { "url" => "/about-us/how-citizens-advice-works/", "label" => "How Citizens Advice works" },
          { "url" => "/resources-and-tools/about-this-site/disclaimer-and-copyright/", "label" => "Disclaimer and Copyright" },
          { "url" => "/about-us/citizens-advice-privacy-policy/", "label" => "Privacy and cookies" },
          { "url" => "http://example.com", "label" => "External link", "icon" => "external-link" }
        ]
      }
    }
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
    <p><b>Bail for Immigration Detainees</b></p>
    <p>Telephone: 01234 567890</p>
    <p>Monday to Thursday 8am to 1pm</p>
    <p>Calls cost a lot of money</p>
    <p><a href='http://link.to.the.website'>Link to the website</a></p>
  HTML

  "page_review_date" => "21 September 2019",

  "targeted_content" => {
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
        <a href="https://www.citizensadvice.org.uk/immigration/staying-in-the-uk-after-brexit/keeping-your-family-in-the-uk-after-brexit/">
        Check if you can apply to the EU Settlement Scheme</a>
      </p>
    HTML
  },

  "success_message" => "Thank you for your feedback"
}
