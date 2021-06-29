# frozen_string_literal: true

# default behaviour - large, list, one for each option, value, checked, name, id
# optional behaviour - optional, hint, inline, small, error, layout
# invalid params - size, layout, optional

RSpec.describe CitizensAdviceComponents::RadioGroup, type: :component do
  let(:subject) do
    render_inline CitizensAdviceComponents::RadioGroup.new(
      label: label.presence,
      radio_buttons: radio_buttons.presence,
      options: {
        error_message: error_message.presence,
        hint: hint.presence,
        optional: optional.presence,
        size: size.presence,
        layout: layout.presence
      }
    )
  end

  let(:name) { "radio-buttons" }
  let(:label) { "Radio button group field" }
  let(:radio_buttons) do
    [
      {}
    ]
  end

  it "renders a radio button for each element in radio_buttons" do
    expect(subject.css("input[type='radio'").length).to eq
  end
end
