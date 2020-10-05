require 'rubygems'
require 'bundler/setup'
require 'haml'
require 'rails_i18n'
require 'action_view'

# Allow shorthand t() helper to be used
include ActionView::Helpers::TranslationHelper

I18n.available_locales = [:en, :cy]
I18n.load_path += Dir['locales/*.yml']
I18n.default_locale = :en

require('./styleguide/haml_locals.rb')

HAML_DIR = File.join(Dir.pwd, 'haml')
HTML_EXTENSION = '.html.haml'
STORY_DIR = File.join(Dir.pwd, 'styleguide', 'components', 'haml')
LOCALS = @locals

Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8

##
# Emulates the rails render helper so that nested partials can be rendered
def render(partial, opts = {})
  case partial
  when Hash
    locals = partial[:locals] || {}
    partial = partial[:partial]
  else
    locals = opts && opts[:locals] || {}
  end

  haml_file = "_" + File.basename(partial) + ".html.haml"

  File.open(File.join(HAML_DIR, haml_file), 'r') do |file|
    engine = Haml::Engine.new(file.read)
    engine.render(Object.new, LOCALS.merge(locals))
  end
end

##
# Renders a comment in place of a react component.
def react_component(component_class_name, props={}, html_options={})
  "<!-- there should be a #{component_class_name} react_component here -->"
end

# loads all the locals. Downside - getting templates
# to regenerate when this changes.

engine = Haml::Engine.new(ARGF.read)
STDOUT.write(engine.render(Object.new, LOCALS))
