# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::DateInput, type: :component do
  subject(:component) do
    render_inline described_class.new(
      name: name.presence,
      label: label.presence,
      errors: errors.presence,
      values: values.presence
    )
  end

  let(:name) { "example-date-input" }
  let(:label) { "Example date input" }
  let(:errors) { nil }
  let(:values) { nil }

  it "renders a day label" do
    expect(subject.text.strip).to include "Day"
  end

  it "renders a month label" do
    expect(subject.text.strip).to include "Month"
  end

  it "renders a year label" do
    expect(subject.text.strip).to include "Year"
  end

  it "renders a day input" do
    expect(subject.css("[data-testid=day-input]")).to be_present
  end

  it "renders a month input" do
    expect(subject.css("[data-testid=month-input]")).to be_present
  end

  it "renders a year input" do
    expect(subject.css("[data-testid=year-input]")).to be_present
  end

  context "in Cymraeg" do
    around { |example| I18n.with_locale(:cy) { example.run } }

    it "renders a day label" do
      expect(subject.text.strip).to include "Dydd"
    end

    it "renders a month label" do
      expect(subject.text.strip).to include "Mis"
    end

    it "renders a year label" do
      expect(subject.text.strip).to include "Blwyddyn"
    end
  end

  context "with errors" do
    let(:errors) { %i[day month year] }

    it "renders the day input as error" do
      expect(subject.css("[data-testid=day-input]").attribute("aria-invalid")).to be_present
    end

    it "renders the month input as error" do
      expect(subject.css("[data-testid=month-input]").attribute("aria-invalid")).to be_present
    end

    it "renders the year input as error" do
      expect(subject.css("[data-testid=year-input]").attribute("aria-invalid")).to be_present
    end
  end

  context "with values" do
    let(:values) do
      {
        day: 1,
        month: 2,
        year: 1990
      }
    end

    it "renders the day input with the correct value" do
      expect(subject.css("[data-testid=day-input]").attribute("value").value).to eq "1"
    end

    it "renders the month input with the correct value" do
      expect(subject.css("[data-testid=month-input]").attribute("value").value).to eq "2"
    end

    it "renders the year input with the correct value" do
      expect(subject.css("[data-testid=year-input]").attribute("value").value).to eq "1990"
    end
  end
end
