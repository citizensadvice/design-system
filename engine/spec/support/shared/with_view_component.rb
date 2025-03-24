# frozen_string_literal: true

RSpec.shared_context "with view component" do
  let(:controller) { ActionController::Base.new }
  let(:lookup_context) { ActionView::LookupContext.new(nil) }
  let(:template) { ActionView::Base.new(lookup_context, {}, controller) }
  let(:builder) { CitizensAdviceComponents::FormBuilder.new(:form, model, template, {}) }
  let(:component_double) { instance_double(component, with_content: nil, render_in: nil) }

  before { allow(component).to receive(:new).and_return(component_double) }
end
