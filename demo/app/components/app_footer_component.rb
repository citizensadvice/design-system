# frozen_string_literal: true

class AppFooterComponent < ViewComponent::Base
  def call
    render CitizensAdviceComponents::Footer.new do |c|
      c.columns(columns)
      c.feedback_link(url: "https://example.com/", external: true)
    end
  end

  def columns
    [{
      title: "Advice",
      links: [
        { url: "/benefits/", title: "Benefits" },
        { url: "/work/", title: "Work" },
        { url: "/debt-and-money/", title: "Debt and Money" },
        { url: "/consumer/", title: "Consumer" },
        { url: "/family/", title: "Family" },
        { url: "/housing/", title: "Housing" },
        { url: "/law-and-courts/", title: "Law and courts" },
        { url: "/immigration/", title: "Immigration" },
        { url: "/health/", title: "Health" }
      ]
    },
     {
       title: "Resources and tools",
       links: [
         { url: "/about-us/how-citizens-advice-works/products-and-services/adviser-resources/", title: "Advisor resources" },
         { url: "/about-us/how-we-provide-advice/our-prevention-work/education/", title: "Education resources" },
         { url: "/resources-and-tools/about-this-site/accessibility/", title: "Accessibility" },
         { url: "/resources-and-tools/about-this-site/accessibility/", title: "Site search" },
         { url: "/resources-and-tools/search-navigation-tools/a-to-z-of-advice/", title: "A-Z of advice" }
       ]
     },
     {
       title: "More from us",
       links: [
         { url: "/about-us/", title: "About us" },
         { url: "/about-us/how-citizens-advice-works/who-we-are-and-what-we-do/annual-reports/", title: "Annual reports" },
         { url: "/about-us/contact-us/contact-us/contact-us/", title: "Contact us" },
         { url: "/about-us/contact-us/contact-us/make-a-complaint-about-us/", title: "Complaints" },
         { url: "/about-us/how-citizens-advice-works/media/", title: "Media" },
         { url: "/about-us/policy/", title: "Policy research" },
         { url: "/about-us/support-us/", title: "Support us" },
         { url: "/about-us/support-us/volunteering/", title: "Volunteering" },
         { url: "/about-us/how-citizens-advice-works/job-and-voluntary-opportunities/", title: "Jobs" }
       ]
     },
     {
       title: "About Citizens Advice",
       links: [
         { url: "/about-us/how-we-provide-advice/", title: "How we provide advice" },
         { url: "/about-us/difference-we-make/", title: "The difference we make" },
         { url: "/about-us/support-us/", title: "Support us" },
         { url: "/about-us/how-citizens-advice-works/", title: "How Citizens Advice works" },
         { url: "/resources-and-tools/about-this-site/disclaimer-and-copyright/", title: "Disclaimer and Copyright" },
         { url: "/about-us/citizens-advice-privacy-policy/", title: "Privacy and cookies" },
         { url: "http://example.com", title: "External link", icon: "external-link" }
       ]
     }]
  end
end
