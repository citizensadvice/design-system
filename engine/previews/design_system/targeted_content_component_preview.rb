# frozen_string_literal: true

module DesignSystem
  class TargetedContentComponentPreview < ViewComponent::Preview
    def default # rubocop:disable Metrics/MethodLength
      render(
        DesignSystem::TargetedContentComponent.new(
          id: "targeted-content-example",
          title: "If you are a citizen of a country outside the EU, EEA or Switzerland",
          body: <<-HTML.chomp
            <p>You should apply to the EU Settlement Scheme if both:</p>
            <ul>
              <li>you’re in the UK by 31 December 2020</li>
              <li>you have family in the UK from the EU, EEA or Switzerland</li>
            </ul>
            <p>
              You need to apply to the scheme even if you have a permanent
              residence card as it will not be valid after 31 December 2020.
            </p>
          HTML
        )
      )
    end

    def adviser # rubocop:disable Metrics/MethodLength
      render(
        DesignSystem::TargetedContentComponent.new(
          type: "adviser",
          id: "targeted-content-adviser",
          title: "Targeted content title",
          body: <<-HTML.chomp
            <p>
              Students and people who can support themselves without working
              (either with their own money, or with help from family or friends)
              can have a right to reside.
            </p>
            <p>
              One condition of this type of right to reside is that they won’t
              be an ‘unreasonable burden on the social assistance system’ - either
              they’re unlikely to claim benefits or, if they do, they won’t need them for long.
            </p>
          HTML
        )
      )
    end

    def with_anchor; end
  end
end
