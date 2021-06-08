# frozen_string_literal: true

module Input
  class FixedWidths < ::Base
    set_url "/iframe.html?id=forms-input--fixed-widths&viewMode=story"

    elements :inputs, ".cads-form-field:not(.cads-form-field--has-error) input"
  end
end
