# frozen_string_literal: true

module BasePage
  def html
    Kramdown::Document.new(
      rendered_content,
      input: "GFM",
      syntax_highlighter: "rouge",
      auto_ids: true
    ).to_html.html_safe # rubocop:disable Rails/OutputSafety
  end

  # Allow passing the object to path helpers
  def to_param
    slug
  end

  # Combined with  to_param, allow compatibility with
  # action pack helpers e.g. link_to page, page_path(page)
  def to_s
    title
  end

  private

  # Pass the content through the application renderer first
  # to parse any ERB templating before processing the remaining content as markdown
  def rendered_content
    ApplicationController
      .renderer
      .render(inline: content, layout: false)
  end
end
