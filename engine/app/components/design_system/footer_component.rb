# frozen_string_literal: true

module DesignSystem
  class FooterComponent < ViewComponent::Base # rubocop:disable Metrics/ClassLength
    attr_reader :links, :feedback_url, :homepage_url

    def initialize(
      links: nil,
      url_prefix: "https://www.citizensadvice.org.uk",
      feedback_url: nil,
      homepage_url: "/"
    )
      super
      @url_prefix = url_prefix
      @links = links || default_links
      @feedback_url = feedback_url
      @homepage_url = homepage_url
    end

    private

    def default_links # rubocop:disable Metrics/MethodLength
      {
        column_one: {
          title: "Advice",
          links: [
            {
              url: "#{@url_prefix}/benefits/",
              label: "Benefits"
            },
            {
              url: "#{@url_prefix}/work/",
              label: "Work"
            },
            {
              url: "#{@url_prefix}/debt-and-money/",
              label: "Debt and Money"
            },
            {
              url: "#{@url_prefix}/consumer/",
              label: "Consumer"
            },
            {
              url: "#{@url_prefix}/family/",
              label: "Family"
            },
            {
              url: "#{@url_prefix}/housing/",
              label: "Housing"
            },
            {
              url: "#{@url_prefix}/law-and-courts/",
              label: "Law and courts"
            },
            {
              url: "#{@url_prefix}/immigration/",
              label: "Immigration"
            },
            {
              url: "#{@url_prefix}/health/",
              label: "Health"
            }
          ]
        },
        column_two: {
          title: "Resources and tools",
          links: [
            {
              url: "#{@url_prefix}/about-us/how-citizens-advice-works/products-and-services/adviser-resources/",
              label: "Advisor resources"
            },
            {
              url: "#{@url_prefix}/about-us/how-we-provide-advice/our-prevention-work/education/",
              label: "Education resources"
            },
            {
              url: "#{@url_prefix}/resources-and-tools/about-this-site/accessibility/",
              label: "Accessibility"
            },
            {
              url: "#{@url_prefix}/resources-and-tools/about-this-site/accessibility/",
              label: "Site search"
            },
            {
              url: "#{@url_prefix}/resources-and-tools/search-navigation-tools/a-to-z-of-advice/",
              label: "A-Z of advice"
            }
          ]
        },
        column_three: {
          title: "More from us",
          links: [
            {
              url: "#{@url_prefix}/about-us/",
              label: "About us"
            },
            {
              url: "#{@url_prefix}/about-us/how-citizens-advice-works/who-we-are-and-what-we-do/annual-reports/",
              label: "Annual reports"
            },
            {
              url: "#{@url_prefix}/about-us/contact-us/contact-us/contact-us/",
              label: "Contact us"
            },
            {
              url: "#{@url_prefix}/about-us/contact-us/contact-us/make-a-complaint-about-us/",
              label: "Complaints"
            },
            {
              url: "#{@url_prefix}/about-us/how-citizens-advice-works/media/",
              label: "Media"
            },
            {
              url: "#{@url_prefix}/about-us/policy/",
              label: "Policy reseach"
            },
            {
              url: "#{@url_prefix}/about-us/support-us/",
              label: "Support us"
            },
            {
              url: "#{@url_prefix}/about-us/support-us/volunteering/",
              label: "Volunteering"
            },
            {
              url: "#{@url_prefix}/about-us/how-citizens-advice-works/job-and-voluntary-opportunities/",
              label: "Jobs"
            }
          ]
        },
        column_four: {
          title: "About Citizens Advice",
          links: [
            {
              url: "#{@url_prefix}/about-us/how-we-provide-advice/",
              label: "How we provide advice"
            },
            {
              url: "#{@url_prefix}/about-us/difference-we-make/",
              label: "The difference we make"
            },
            {
              url: "#{@url_prefix}/about-us/support-us/",
              label: "Support us"
            },
            {
              url: "#{@url_prefix}/about-us/how-citizens-advice-works/",
              label: "How Citizens Advice works"
            },
            {
              url: "#{@url_prefix}/resources-and-tools/about-this-site/disclaimer-and-copyright/",
              label: "Disclaimer and Copyright"
            },
            {
              url: "#{@url_prefix}/about-us/citizens-advice-privacy-policy/",
              label: "Privacy and cookies"
            }
          ]
        }
      }
    end
  end
end
