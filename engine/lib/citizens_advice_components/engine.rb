# frozen_string_literal: true

require "rails/engine"
require "rails-i18n"
require "view_component"

module CitizensAdviceComponents
  class Engine < ::Rails::Engine
    isolate_namespace CitizensAdviceComponents

    config.autoload_paths = %W[
      #{CitizensAdviceComponents::Engine.root.join('app/helpers')}
      #{CitizensAdviceComponents::Engine.root.join('app/components')}
      #{CitizensAdviceComponents::Engine.root.join('app/lib')}
    ]

    # Rails by default wraps errors generated with helpers with a .field_with_errors class,
    # disable this to avoid conflicting with our own markup.
    # https://guides.rubyonrails.org/configuring.html#config-action-view-field-error-proc
    # https://discuss.rubyonrails.org/t/errors-on-a-form-field-helper-change-the-layout/75144/4
    config.to_prepare do
      ActionView::Base.field_error_proc = lambda { |html_tag, _instance|
        "".html_safe + html_tag
      }
    end

    # Ensure that application level configuration settings apply to
    # library specific deprecation warnings.
    # https://api.rubyonrails.org/classes/ActiveSupport/Deprecation.html
    initializer "citizens_advice_components.deprecator" do |app|
      app.deprecators[:citizens_advice_components] = CitizensAdviceComponents.deprecator
    end
  end
end
