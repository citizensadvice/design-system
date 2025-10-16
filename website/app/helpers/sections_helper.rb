# frozen_string_literal: true

module SectionsHelper
  def navigation_sections
    [
      { url: guides_path, title: t("sections.guides.title"), description: t("sections.guides.description") },
      { url: foundations_path, title: t("sections.foundations.title"), description: t("sections.foundations.description") },
      { url: components_path, title: t("sections.components.title"), description: t("sections.components.description") },
      { url: patterns_path, title: t("sections.patterns.title"), description: t("sections.patterns.description") },
      { url: page_path("accessibility"), title: t("sections.accessibility.title"), description: t("sections.accessibility.description") }
    ]
  end
end
