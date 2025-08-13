# frozen_string_literal: true

ComponentExample = Decant.define(dir: Rails.root.join("content/examples"), ext: "html.erb") do
  include BasePage

  frontmatter :title

  def id
    title.downcase.parameterize
  end

  def html
    # Alias to rendered_content, we don't need markdown processing here
    rendered_content
  end

  def highlighted_html
    lexer = Rouge::Lexers::HTML.new
    beautified_content = HtmlBeautifier.beautify(rendered_content)
    formatter.format(lexer.lex(beautified_content))
  end

  def highlighted_source
    lexer = Rouge::Lexers::ERB.new
    formatter.format(lexer.lex(content))
  end

  def iframe?
    !!frontmatter_with_defaults[:iframe]
  end

  def form?
    !!frontmatter_with_defaults[:form]
  end

  def show_html?
    !!frontmatter_with_defaults[:show_html]
  end

  def show_source?
    !!frontmatter_with_defaults[:show_source]
  end

  private

  def frontmatter_with_defaults
    frontmatter.with_defaults(
      iframe: false,
      show_html: true,
      show_source: true,
      form: false
    )
  end

  def formatter
    @formatter ||= Rouge::Formatters::HTML.new
  end
end
