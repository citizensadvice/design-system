# frozen_string_literal: true

ParameterType(
  name: "button-type",
  regexp: /(Primary|Secondary|Tertiary)/,
  transformer: ->(button) { button.downcase }
)

ParameterType(
  name: "skip-link-area",
  regexp: /(navigation|content|footer)/,
  transformer: ->(area) { area.to_sym }
)
