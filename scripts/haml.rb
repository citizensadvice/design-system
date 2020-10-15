# frozen_string_literal: true
require "rubygems"
require "bundler/setup"
require "haml"
require "rails_i18n"
require "action_view"

require("./styleguide/haml_locals")


HAML_DIR = File.join(Dir.pwd, "haml")
HTML_EXTENSION = ".html.haml"
STORY_DIR = File.join(Dir.pwd, "styleguide", "components", "haml")
LOCALS = @locals

# Should be executed with --language <lang> | <haml_source>
ARGV.shift
lang = ARGV.shift
lang_sym = lang.to_sym

I18n.available_locales = [lang_sym]
I18n.load_path += Dir["locales/#{lang}.yml"]
I18n.default_locale = lang_sym

# Allow shorthand t() helper to be used
include ActionView::Helpers::TranslationHelper




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

  haml_file = "_#{File.basename(partial)}.html.haml"

  File.open(File.join(HAML_DIR, haml_file), "r") do |file|
    engine = Haml::Engine.new(file.read)
    engine.render(Object.new, LOCALS.merge(locals))
  end
end

##
# Renders a comment in place of a react component.
def react_component(component_class_name, _props = {}, _html_options = {})
  "<!-- there should be a #{component_class_name} react_component here -->"
end

# loads all the locals. Downside - getting templates
# to regenerate when this changes.

engine = Haml::Engine.new(ARGF.read)
$stdout.write(engine.render(Object.new, LOCALS))
