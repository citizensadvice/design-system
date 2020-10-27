# frozen_string_literal: true

Given("the language is Welsh") do
  @component.switch_language(:cy)
end

Given("the language is English") do
  @component.switch_language(:en)
end
