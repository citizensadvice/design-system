# frozen_string_literal: true

desc "Generate component preview examples"
task generate_examples: :environment do
  @session ||= ActionDispatch::Integration::Session.new(Rails.application)

  # Default host for integration sessions is example.com,
  # set to localhost to bypass host warning
  @session.host = "localhost"

  ViewComponent::Preview.all.each do |preview|
    preview.examples.each do |example|
      component_name = preview.preview_name.split("/").last
      component_key = "#{component_name}/#{example}"

      if [
        # Excluded because this example is dynamic
        "pagination/with_dynamic_query_parameters"
      ].include?(component_key)
        puts "Skipping #{component_key}"
      else
        @session.get "/rails/view_components/#{preview.preview_name}/#{example}"
        doc = Nokogiri::HTML.parse(@session.response.body)
        component_html = doc.css("#content").inner_html
        output_path = Rails.application.root.join("../examples/#{component_key}.html")
        FileUtils.mkdir_p(output_path.dirname)
        puts "Generated #{component_key}"
        File.write output_path, component_html.to_s.strip
      end
    end
  end

  HighVoltage.page_ids.each do |slug|
    @session.get "/#{slug}"
    doc = Nokogiri::HTML.parse(@session.response.body)
    component_html = doc.css("#content").inner_html
    output_path = Rails.application.root.join("../examples/sample_pages/#{slug}.html")
    FileUtils.mkdir_p(output_path.dirname)
    puts "Writing sample page to #{output_path}"
    File.write output_path, component_html.to_s.strip
  end
end
