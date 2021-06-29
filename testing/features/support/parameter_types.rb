# frozen_string_literal: true

ParameterType(
  name: "button-type",
  regexp: /(Primary|Secondary|Tertiary)/,
  transformer: ->(button) { button.downcase }
)
