# frozen_string_literal: true

class DateInputPreview < ViewComponent::Preview
  def example
    render CitizensAdviceComponents::DateInput.new(name: "dob", label: "Date of birth") do |c|
      c.with_date_fields(date_fields)
    end
  end

  def hint
    render CitizensAdviceComponents::DateInput.new(
      name: "bday",
      label: "Date of birth",
      options: {
        hint: "Enter your date of birth, like 01 02 1990"
      }
    ) do |c|
      c.with_date_fields(date_fields)
    end
  end

  def optional
    render CitizensAdviceComponents::DateInput.new(
      name: "bday",
      label: "Date of birth",
      options: {
        optional: true
      }
    ) do |c|
      c.with_date_fields(date_fields)
    end
  end

  def error
    render CitizensAdviceComponents::DateInput.new(
      name: "bday",
      label: "Date of birth",
      errors: %i[day month year],
      options: {
        error_message: "Enter your date of birth, like 01 02 1990"
      }
    ) do |c|
      c.with_date_fields(date_fields)
    end
  end

  def incomplete_error
    render CitizensAdviceComponents::DateInput.new(
      name: "bday",
      label: "Date of birth",
      errors: %i[year],
      options: {
        error_message: "Date of birth must include a year"
      }
    ) do |c|
      c.with_date_fields(date_fields)
    end
  end

  def validation_error
    render CitizensAdviceComponents::DateInput.new(
      name: "bday",
      label: "Date of birth",
      errors: %i[day],
      options: {
        error_message: "Date of birth must be a real date"
      }
    ) do |c|
      c.with_date_fields(date_fields_validation_error)
    end
  end

  def values
    render CitizensAdviceComponents::DateInput.new(
      name: "bday",
      label: "Date of birth"
    ) do |c|
      c.with_date_fields(date_fields_values)
    end
  end

  def autocomplete
    render CitizensAdviceComponents::DateInput.new(
      name: "bday",
      label: "Date of birth"
    ) do |c|
      c.with_date_fields(date_fields_autocomplete)
    end
  end

  private

  def date_fields
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

  def date_fields_validation_error
    [
      {
        name: "day",
        id: "day-id",
        timespan: :day,
        value: 99
      },
      {
        name: "month",
        id: "month-id",
        timespan: :month,
        value: 1
      },
      {
        name: "year",
        id: "year-id",
        timespan: :year,
        value: 1990
      }
    ]
  end

  def date_fields_values
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
        value: 1
      },
      {
        name: "year",
        id: "year-id",
        timespan: :year,
        value: 1990
      }
    ]
  end

  def date_fields_autocomplete
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
end
