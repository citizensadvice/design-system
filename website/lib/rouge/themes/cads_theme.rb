# frozen_string_literal: true

module Rouge
  module Themes
    class CadsTheme < Rouge::CSSTheme
      name "cads-theme"

      style Text,       fg: "#161616"
      style Keyword,    fg: "#004B88", bold: true
      style Literal,    fg: "#006278"
    end
  end
end
