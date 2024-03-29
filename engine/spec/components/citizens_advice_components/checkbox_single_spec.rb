# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::CheckboxSingle, type: :component do
  subject { page }

  context "with default arguments" do
    before do
      render_inline described_class.new(
        name: "my-checkbox"
      ) do |c|
        c.with_checkbox(label: "Option 1", value: "1")
      end
    end

    it { is_expected.to have_field "Option 1", type: :checkbox, count: 1, checked: false }

    it "does not pass label through to input" do
      expect(page).to have_no_css "input[label]"
    end
  end

  context "when no checkbox is provided" do
    before do
      render_inline described_class.new(
        name: "my-checkbox"
      )
    end

    it { is_expected.to have_no_css ".cads-checkbox-single" }
  end

  context "when there is an error message" do
    before do
      render_inline described_class.new(
        name: "my-checkbox",
        error_message: "This is the error message"
      ) do |c|
        c.with_checkbox(label: "Option 1", value: "1")
      end
    end

    it { is_expected.to have_css "#my-checkbox-error", text: "This is the error message" }
    it { is_expected.to have_css "input[aria-invalid]", count: 1 }
    it { is_expected.to have_css "input[aria-describedby=my-checkbox-error]", count: 1 }
  end

  context "when there are additional attributes provided" do
    before do
      render_inline described_class.new(
        name: "my-checkbox",
        error_message: "This is the error message"
      ) do |c|
        c.with_checkbox(label: "Option 1", value: "1", "data-additional": "example")
      end
    end

    it { is_expected.to have_css "[data-additional=example]" }
  end
end
