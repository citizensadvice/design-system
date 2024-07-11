# frozen_string_literal: true

class SummaryListPreview < ViewComponent::Preview
  def default
    render CitizensAdviceComponents::SummaryList.new(items: [
      { name: "Salary", value: "£26,000" },
      { name: "Hours per week", value: "37.5" }
    ])
  end
end
