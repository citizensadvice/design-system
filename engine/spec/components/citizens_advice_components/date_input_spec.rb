# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::DateInput, type: :component do
  subject { page }

  let(:date_fields) do
    [
      {
        name: "day",
        id: "day-id",
        timespan: :day
      },
      {
        name: "month",
        id: "month-id",
        timespan: :month
      },
      {
        name: "year",
        id: "year-id",
        timespan: :year
      }
    ]
  end

  let(:date_fields_with_values) do
    [
      {
        name: "day",
        id: "day-id",
        timespan: :day,
        value: 1
      },
      {
        name: "month",
        id: "month-id",
        timespan: :month,
        value: 2
      },
      {
        name: "year",
        id: "year-id",
        timespan: :year,
        value: 1990
      }
    ]
  end

  let(:date_fields_with_autocomplete) do
    [
      {
        name: "day",
        id: "day-id",
        timespan: :day,
        autocomplete: "bday-day"
      },
      {
        name: "month",
        id: "month-id",
        timespan: :month,
        autocomplete: "bday-month"
      },
      {
        name: "year",
        id: "year-id",
        timespan: :year,
        autocomplete: "bday-year"
      }
    ]
  end

  context "with default arguments" do
    before do
      render_inline described_class.new(
        name: "example-date-input",
        label: "Example date input",
        errors: nil,
        values: nil
      ) do |c|
        c.with_date_fields(date_fields)
      end
    end

    it { is_expected.to have_field "Day" }
    it { is_expected.to have_field "Month" }
    it { is_expected.to have_field "Year" }

    context "when in Cymraeg" do
      around { |example| I18n.with_locale(:cy) { example.run } }

      it { is_expected.to have_field "Dydd" }
      it { is_expected.to have_field "Mis" }
      it { is_expected.to have_field "Blwyddyn" }
    end
  end

  context "with errors" do
    let(:error_message) { "Enter your date of birth, like 01 02 1990" }

    before do
      render_inline described_class.new(
        name: "example-date-input",
        label: "Example date input",
        errors: %i[day month year],
        options: {
          error_message: error_message
        }
      ) do |c|
        c.with_date_fields(date_fields)
      end
    end

    it "renders the error message" do
      expect(page).to have_text error_message
    end

    it "renders the day input as error" do
      expect(page).to have_selector "[data-testid=day-id-input].cads-input--error"
    end

    it "renders the month input as error" do
      expect(page).to have_selector "[data-testid=month-id-input].cads-input--error"
    end

    it "renders the year input as error" do
      expect(page).to have_selector "[data-testid=year-id-input].cads-input--error"
    end
  end

  context "with values" do
    before do
      render_inline described_class.new(
        name: "example-date-input",
        label: "Example date input",
        errors: %i[day month year]
      ) do |c|
        c.with_date_fields(date_fields_with_values)
      end
    end

    it { is_expected.to have_field "Day", with: "1" }
    it { is_expected.to have_field "Month", with: "2" }
    it { is_expected.to have_field "Year", with: "1990" }
  end

  context "with autocomplete" do
    before do
      render_inline described_class.new(
        name: "example-date-input",
        label: "Example date input"
      ) do |c|
        c.with_date_fields(date_fields_with_autocomplete)
      end
    end

    it { is_expected.to have_selector "input[autocomplete=bday-day]" }
    it { is_expected.to have_selector "input[autocomplete=bday-month]" }
    it { is_expected.to have_selector "input[autocomplete=bday-year]" }
  end
end
