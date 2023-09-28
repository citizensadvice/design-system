# frozen_string_literal: true

class DateInputPreview < ViewComponent::Preview
  def example
    subject = CitizensAdviceComponents::DateInput.new(name: "dob", label: "Date of birth")

    render subject
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
    subject = CitizensAdviceComponents::DateInput.new(
      name: "bday",
      label: "Date of birth",
      options: {
        optional: true
      }
    )

    render subject
  end

  def error
    subject = CitizensAdviceComponents::DateInput.new(
      name: "bday",
      label: "Date of birth",
      errors: %i[day month year],
      options: {
        error_message: "Enter your date of birth, like 01 02 1990"
      }
    )

    render subject
  end

  def incomplete_error
    subject = CitizensAdviceComponents::DateInput.new(
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

    render subject
  end

  def validation_error
    subject = CitizensAdviceComponents::DateInput.new(
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

    render subject
  end

  def values
    subject = CitizensAdviceComponents::DateInput.new(
      name: "bday",
      label: "Date of birth",
      values: {
        day: 1,
        month: 1,
        year: 1990
      }
    )

    render subject
  end
end
