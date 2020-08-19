# frozen_string_literal: true

ParameterType(
  name: "pension-result-option",
  regexp: /(State Pension|Pensions)/,
  transformer: ->(option) { option },
  use_for_snippets: false
)

ParameterType(
  name: "page-type",
  regexp: /(home|immigration) page/,
  transformer: ->(page_type) { App.new.send(page_type) },
  use_for_snippets: false
)
