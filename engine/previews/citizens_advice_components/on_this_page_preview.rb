# frozen_string_literal: true

module CitizensAdviceComponents
  class OnThisPagePreview < ViewComponent::Preview
    def example
      render(
        CitizensAdviceComponents::OnThisPage.new(
          body: {
            "data"=>{},
            "content"=>[
              {
                "data"=>{},
                "content"=>[
                  {
                    "data"=>{},
                    "marks"=>[],
                    "value"=>"Paragraph text, should not be included in table of contents",
                    "nodeType"=>"text"
                  }
                ],
                "nodeType"=>"paragraph"
              },
              {
                "data"=>{},
                "content"=>[
                  {
                    "data"=>{},
                    "marks"=>[],
                    "value"=>"An example level 2 heading",
                    "nodeType"=>"text"
                  }
                ],
                "nodeType"=>"heading-2"
              },
              {
                "data"=>{},
                "content"=>[
                  {
                    "data"=>{},
                    "marks"=>[],
                    "value"=>"Another example paragraph",
                    "nodeType"=>"text"
                  }
                ],
                "nodeType"=>"paragraph"
              },
              {
                "data"=>{},
                "content"=>[
                  {
                    "data"=>{},
                    "marks"=>[],
                    "value"=>"One more example paragraph",
                    "nodeType"=>"text"
                  }
                ],
                "nodeType"=>"paragraph"
              },
              {
                "data"=>{},
                "content"=>[
                  {
                    "data"=>{},
                    "marks"=>[],
                    "value"=>"A second level 2 heading example",
                    "nodeType"=>"text"
                  }
                ],
                "nodeType"=>"heading-2"
              },
              {
                "data"=>{},
                "content"=>[
                  {
                    "data"=>{},
                    "marks"=>[],
                    "value"=>"Paragraph text, should not be included in table of contents",
                    "nodeType"=>"text"
                  }
                ],
                "nodeType"=>"paragraph"
              },
              {
                "data"=>{},
                "content"=>[
                  {
                    "data"=>{},
                    "marks"=>[],
                    "value"=>"One more level 2 heading example",
                    "nodeType"=>"text"
                  }
                ],
                "nodeType"=>"heading-2"
              },
              {
                "data"=>{},
                "content"=>[
                  {
                    "data"=>{},
                    "marks"=>[],
                    "value"=>"Paragraph text, should not be included in table of contents",
                    "nodeType"=>"text"
                  }
                ],
                "nodeType"=>"paragraph"
              }
            ],
            "nodeType"=>"document"
          }
        )
      )
    end

    def with_nested_links
      render(
        CitizensAdviceComponents::OnThisPage.new(
          body: {
            "data"=>{},
            "content"=>[
              {
                "data"=>{},
                "content"=>[
                  {
                    "data"=>{},
                    "marks"=>[],
                    "value"=>"Paragraph text, should not be included in table of contents",
                    "nodeType"=>"text"
                  }
                ],
                "nodeType"=>"paragraph"
              },
              {
                "data"=>{},
                "content"=>[
                  {
                    "data"=>{},
                    "marks"=>[],
                    "value"=>"An example level 2 heading",
                    "nodeType"=>"text"
                  }
                ],
                "nodeType"=>"heading-2"
              },
              {
                "data"=>{},
                "content"=>[
                  {
                    "data"=>{},
                    "marks"=>[],
                    "value"=>"Another example paragraph",
                    "nodeType"=>"text"
                  }
                ],
                "nodeType"=>"paragraph"
              },
              {
                "data"=>{},
                "content"=>[
                  {
                    "data"=>{},
                    "marks"=>[],
                    "value"=>"A level 3 heading",
                    "nodeType"=>"text"
                  }
                ],
                "nodeType"=>"heading-3"
              },
              {
                "data"=>{},
                "content"=>[
                  {
                    "data"=>{},
                    "marks"=>[],
                    "value"=>"One more example paragraph",
                    "nodeType"=>"text"
                  }
                ],
                "nodeType"=>"paragraph"
              },
              {
                "data"=>{},
                "content"=>[
                  {
                    "data"=>{},
                    "marks"=>[],
                    "value"=>"A second level 2 heading example",
                    "nodeType"=>"text"
                  }
                ],
                "nodeType"=>"heading-2"
              },
              {
                "data"=>{},
                "content"=>[
                  {
                    "data"=>{},
                    "marks"=>[],
                    "value"=>"Paragraph text, should not be included in table of contents",
                    "nodeType"=>"text"
                  }
                ],
                "nodeType"=>"paragraph"
              },
              {
                "data"=>{},
                "content"=>[
                  {
                    "data"=>{},
                    "marks"=>[],
                    "value"=>"One more level 2 heading example",
                    "nodeType"=>"text"
                  }
                ],
                "nodeType"=>"heading-2"
              },
              {
                "data"=>{},
                "content"=>[
                  {
                    "data"=>{},
                    "marks"=>[],
                    "value"=>"Paragraph text, should not be included in table of contents",
                    "nodeType"=>"text"
                  }
                ],
                "nodeType"=>"paragraph"
              }
            ],
            "nodeType"=>"document"
          },
          show_nested_links: true
        )
      )
    end
    def with_links
      render(
        CitizensAdviceComponents::OnThisPage.new(
          links: [
            { id: "/about-us/how-citizens-advice-works/products-and-services/adviser-resources/", label: "Advisor resources", children: [] },
            { id: "/about-us/how-we-provide-advice/our-prevention-work/education/", label: "Education resources", children: [] },
            { id: "/resources-and-tools/about-this-site/accessibility/", label: "Accessibility", children: [] },
            { id: "/resources-and-tools/about-this-site/accessibility/", label: "Site search", children: [{ id: "/about-us/how-citizens-advice-works/products-and-services/adviser-resources/", label: "Advisor resources"}]},
            { id: "/resources-and-tools/search-navigation-tools/a-to-z-of-advice/", label: "A-Z of advice", children: [] }
          ],
          show_nested_links: true
        )
      )
    end
  end
end
