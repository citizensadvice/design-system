# frozen_string_literal: true

# Similar interface to ViewComponent::TestHelpers but
# for working with form builder methods
module FormBuilderTestHelpers
  attr_reader :rendered_content

  def page
    @page ||= Capybara::Node::Simple.new(@rendered_content)
  end

  def render_inline(output)
    @page = nil
    @rendered_content = Nokogiri::HTML5.fragment(output)
  end

  def form_builder_for(model)
    CitizensAdviceComponents::FormBuilder.new(
      model&.model_name&.param_key,
      model,
      template,
      {}
    )
  end

  private

  def lookup_context
    ActionView::LookupContext.new(nil)
  end

  def template
    ActionView::Base.new(lookup_context, {}, nil)
  end
end
