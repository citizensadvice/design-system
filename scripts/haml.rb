require 'rubygems'
require 'bundler/setup'
require 'haml'

HAML_DIR = File.join(Dir.pwd, 'haml')
HTML_EXTENSION = '.html.haml'
STORY_DIR = File.join(Dir.pwd, 'styleguide', 'components', 'haml')

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
    engine.render(Object.new, locals) 
  end
end

def react_component(component_class_name, props={}, html_options={}) 
  "<!-- there should be a #{component_class_name} react_component here -->"
end

Dir.glob('*.haml', base: HAML_DIR) do |file_name|
  template_path = File.join(HAML_DIR, file_name)
  
  basename = File.basename(template_path, HTML_EXTENSION)
  locals_path = File.join(STORY_DIR, basename + '.locals.rb')

  require(locals_path) # load locals

  File.open(template_path, 'r') do |file|
    puts "Generating haml for #{file_name}"
    puts '===================='
    engine = Haml::Engine.new(file.read)
    puts engine.render(Object.new, @locals || {})
    puts '===================='
  end
end
  
    
