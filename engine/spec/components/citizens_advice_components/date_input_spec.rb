# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::DateInput, type: :component do
  subject { page }

  context "with default arguments" do
    before do
      render_inline described_class.new(
        name: "example-date-input",
        label: "Example date input",
        errors: nil,
        values: nil
      )
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
    before do
      render_inline described_class.new(
        name: "example-date-input",
        label: "Example date input",
        errors: %i[day month year],
        values: nil
      )
    end

    it "renders the day input as error" do
      expect(page).to have_selector "[data-testid=day-input][aria-invalid=true]"
    end

    it "renders the month input as error" do
      expect(page).to have_selector "[data-testid=month-input][aria-invalid=true]"
    end

    it "renders the year input as error" do
      expect(page).to have_selector "[data-testid=year-input][aria-invalid=true]"
    end
  end

  context "with values" do
    before do
      render_inline described_class.new(
        name: "example-date-input",
        label: "Example date input",
        errors: %i[day month year],
        values: {
          day: 1,
          month: 2,
          year: 1990
        }
      )
    end

    it { is_expected.to have_field "Day", with: "1" }
    it { is_expected.to have_field "Month", with: "2" }
    it { is_expected.to have_field "Year", with: "1990" }
  end
end
