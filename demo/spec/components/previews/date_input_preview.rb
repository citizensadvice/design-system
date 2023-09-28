# frozen_string_literal: true

class DateInputPreview < ViewComponent::Preview
  def example
    render CitizensAdviceComponents::DateInput.new(name: "dob", label: "Date of birth")
  end

  def hint
    render(
      CitizensAdviceComponents::DateInput.new(
        name: "bday",
        label: "Date of birth",
        options: {
          hint: "Enter your date of birth, like 01 02 1990"
        }
      )
    )
  end

  def optional
    render(
      CitizensAdviceComponents::DateInput.new(
        name: "bday",
        label: "Date of birth",
        options: {
          optional: true
        }
      )
    )
  end

  def error
    render(
      CitizensAdviceComponents::DateInput.new(
        name: "bday",
        label: "Date of birth",
        errors: %i[day month year],
        options: {
          error_message: "Enter your date of birth, like 01 02 1990"
        }
      )
    )
  end

  def incomplete_error
    render(
      CitizensAdviceComponents::DateInput.new(
        name: "bday",
        label: "Date of birth",
        errors: %i[year],
        values: {
          day: 1,
          month: 1
        },
        options: {
          error_message: "Date of birth must include a year"
        }
      )
    )
  end

  def validation_error
    render(
      CitizensAdviceComponents::DateInput.new(
        name: "bday",
        label: "Date of birth",
        errors: %i[day],
        values: {
          day: 99,
          month: 1,
          year: 1990
        },
        options: {
          error_message: "Date of birth must be a real date"
        }
      )
    )
  end

  def values
    render(
      CitizensAdviceComponents::DateInput.new(
        name: "bday",
        label: "Date of birth",
        values: {
          day: 1,
          month: 1,
          year: 1990
        }
      )
    )
  end
end
