# frozen_string_literal: true

require "rails_helper"

RSpec.describe CitizensAdviceComponents::Sidebar, type: :component do
  let(:siblings) { JSON.parse(file_fixture("sidebar.json").read) }
  let(:subject) do
    component = RelatedContent.new(links: siblings)
    render_inline(component)
  end

  it "renders the title" do
    expect(subject.text.strip).to include "Sidebar"
  end

  it "renders a link for each sibling" do
    expect(subject.css("a").count).to eq siblings.count
  end
end
