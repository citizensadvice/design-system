# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Textarea, type: :component do
  let(:subject) do
    render_inline CitizensAdviceComponents::Textarea.new(
      name: name.presence,
      label: label.presence,
      type: type.presence,
    )
  end

  let(:name) { "example-input" }
  let(:label) { "Example input" }
  let(:type) { nil }

  RSpec.shared_examples "textarea" do
    it "renders a text area" do
      expect(subject.css("textarea")).to be_present
    end

    it "renders 8 rows" do
      expect(subject.css("textarea").attribute("rows").value).to eq("8")
    end

    context "when a type is specified" do
      let(:type) { :email }

      it "does not render the type attribute" do
        expect(subject.css("textarea").attribute("type")).to eq(nil)
      end
    end
  end

  context "by default" do
    it_behaves_like "textarea"
  end

  context "when a valid number of rows is specified" do
    let(:subject) do
      render_inline CitizensAdviceComponents::Textarea.new(
        name: name.presence,
        label: label.presence,
        type: type.presence,
        rows: rows.presence
      )
    end

    let(:rows) { 10 }

    it "renders the textarea with the correct number of rows" do
      expect(subject.css("textarea").attribute("rows").value).to eq("10")
    end
  end

  context "when an invalid number of rows is specified" do
    let(:subject) do
      render_inline CitizensAdviceComponents::Textarea.new(
        name: name.presence,
        label: label.presence,
        rows: rows.presence
      )
    end

    let(:rows) { "banana" }

    it "renders the default number of rows" do 
        expect(subject.css("textarea").attribute("rows").value).to eq("8")
    end
  end
end
