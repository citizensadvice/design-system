# frozen_string_literal: true

RSpec.describe DesignSystem::TargetedContentComponent do
  subject(:component) do
    render_inline(
      DesignSystem::TargetedContentComponent.new(
        id: "example-id",
        title: "Example targeted content",
        body: "<p>Some content</p>"
      )
    )
  end

  it "has a heading with expected id" do
    expect(component.at("h2").attr("id")).to eq "h-example-id"
  end

  it "has content with expected id" do
    expect(component.at("#example-id-content").name).to eq "div"
  end

  it "has data attributes containing descriptive labels" do
    expect(component.child.attr("data-descriptive-label-show")).to eq "show this section"
    expect(component.child.attr("data-descriptive-label-hide")).to eq "hide this section"
    expect(component.child.attr("data-close-label")).to eq "Close"
  end
end
