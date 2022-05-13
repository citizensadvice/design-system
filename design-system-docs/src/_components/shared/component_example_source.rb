# frozen_string_literal: true

module Shared
  class ComponentExampleSource < ComponentExample
    # Render just the highlighted source from a component example
    def call
      tag.pre(class: "highlight") do
        tag.code do
          raw highlighted_source
        end
      end
    end
  end
end
