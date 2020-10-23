# frozen_string_literal: true

When("I change language (back )to Welsh") do
  unless I18n.locale == :cy
    @component.switch_language(I18n.t(:change_language))
    I18n.locale = :cy
  end
end

When("I change language (back )to English") do
  unless I18n.locale == :en
    @component.switch_language(I18n.t(:change_language))
    I18n.locale = :en
  end
end
