# frozen_string_literal: true

RSpec.describe DesignSystem::NoticeBannerComponent do
  subject(:component) do
    render_inline(
      DesignSystem::NoticeBannerComponent.new(
        label: "Notice",
        body: <<-HTML.chomp
          <p>
            Example notice body.
            <a href="#">Can contain links</a>
          </p>
        HTML
      )
    )
  end

  it "renders notice label" do
    expect(component.at(".cads-notice-banner__title").text).to eq "Notice"
  end

  it "renders notice body" do
    expect(component.text).to include "Example notice body"
  end
end
