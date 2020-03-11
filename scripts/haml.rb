require 'rubygems'
require 'bundler/setup'
require 'haml'

require('./styleguide/haml_locals.rb')

HAML_DIR = File.join(Dir.pwd, 'haml')
HTML_EXTENSION = '.html.haml'
STORY_DIR = File.join(Dir.pwd, 'styleguide', 'components', 'haml')
LOCALS = @locals

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

# This code takes a haml filename and writes out html to a temp folder
# but I don't think we're gonna do it this way - piping seems better

# TEMP_DIR = File.join(Dir.pwd, 'tmp')

# def renderPartial(file_name)
#   template_path = File.join(HAML_DIR, file_name)
  
#   basename = File.basename(template_path, HTML_EXTENSION)
#   locals_path = File.join(STORY_DIR, basename + '.locals.rb')

#   require(locals_path) # load locals

#   File.open(template_path, 'r') do |file|
#     engine = Haml::Engine.new(file.read)
#     rendered = engine.render(Object.new, @locals || {})
#     File.open(File.join(TEMP_DIR, "#{basename}.html"), 'w') do |file|
#       file.write(rendered)
#     end    
#   end
# end

# Dir.glob('*.haml', base: HAML_DIR) do |file_name|
#   renderPartial(file_name)
# end
  

    
