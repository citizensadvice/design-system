# frozen_string_literal: true

class AppFooterComponent < ViewComponent::Base
  def call
    render CitizensAdviceComponents::Footer.new(feedback_url: feedback_url) do |c|
      c.columns(columns)
    end
  end

  def feedback_url
    "https://www.research.net/r/J8PLH2H"
  end

  def columns
    [{
      title: "Advice",
      links: [
        { url: "/benefits/", label: "Benefits" },
        { url: "/work/", label: "Work" },
        { url: "/debt-and-money/", label: "Debt and Money" },
        { url: "/consumer/", label: "Consumer" },
        { url: "/family/", label: "Family" },
        { url: "/housing/", label: "Housing" },
        { url: "/law-and-courts/", label: "Law and courts" },
        { url: "/immigration/", label: "Immigration" },
        { url: "/health/", label: "Health" }
      ]
    },
     {
       title: "Resources and tools",
       links: [
         { url: "/about-us/how-citizens-advice-works/products-and-services/adviser-resources/", label: "Advisor resources" },
         { url: "/about-us/how-we-provide-advice/our-prevention-work/education/", label: "Education resources" },
         { url: "/resources-and-tools/about-this-site/accessibility/", label: "Accessibility" },
         { url: "/resources-and-tools/about-this-site/accessibility/", label: "Site search" },
         { url: "/resources-and-tools/search-navigation-tools/a-to-z-of-advice/", label: "A-Z of advice" }
       ]
     },
     {
       title: "More from us",
       links: [
         { url: "/about-us/", label: "About us" },
         { url: "/about-us/how-citizens-advice-works/who-we-are-and-what-we-do/annual-reports/", label: "Annual reports" },
         { url: "/about-us/contact-us/contact-us/contact-us/", label: "Contact us" },
         { url: "/about-us/contact-us/contact-us/make-a-complaint-about-us/", label: "Complaints" },
         { url: "/about-us/how-citizens-advice-works/media/", label: "Media" },
         { url: "/about-us/policy/", label: "Policy research" },
         { url: "/about-us/support-us/", label: "Support us" },
         { url: "/about-us/support-us/volunteering/", label: "Volunteering" },
         { url: "/about-us/how-citizens-advice-works/job-and-voluntary-opportunities/", label: "Jobs" }
       ]
     },
     {
       title: "About Citizens Advice",
       links: [
         { url: "/about-us/how-we-provide-advice/", label: "How we provide advice" },
         { url: "/about-us/difference-we-make/", label: "The difference we make" },
         { url: "/about-us/support-us/", label: "Support us" },
         { url: "/about-us/how-citizens-advice-works/", label: "How Citizens Advice works" },
         { url: "/resources-and-tools/about-this-site/disclaimer-and-copyright/", label: "Disclaimer and Copyright" },
         { url: "/about-us/citizens-advice-privacy-policy/", label: "Privacy and cookies" },
         { url: "http://example.com", label: "External link", icon: "external-link" }
       ]
     }]
  end
end
