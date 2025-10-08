# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FormBuilder do
  include FormBuilderTestHelpers

  subject { page }

  let(:model) { ExampleForm.invalid_example }
  let(:builder) { form_builder_for(model) }

  describe "#cads_button" do
    context "with default arguments" do
      let(:button) { builder.cads_button }

      it "renders a default button" do
        render_inline button
        expect(page).to have_button text: "Save changes"
      end
    end

    context "when missing variant" do
      let(:button) { builder.cads_button(variant: nil) }

      it "renders a primary button" do
        without_fetch_or_fallback_raises do
          render_inline button
          expect(page).to have_css ".cads-button__primary"
        end
      end
    end

    context "when variant is primary" do
      let(:button) { builder.cads_button(variant: :primary) }

      it "renders a primary button" do
        render_inline button
        expect(page).to have_css ".cads-button__primary"
      end
    end

    context "when variant is secondary" do
      let(:button) { builder.cads_button(variant: :secondary) }

      it "renders a secondary button" do
        render_inline button
        expect(page).to have_css ".cads-button__secondary"
      end
    end

    context "when missing type" do
      let(:button) { builder.cads_button(type: nil) }

      it "renders a button type" do
        without_fetch_or_fallback_raises do
          render_inline button
          expect(page).to have_css "[type='button']"
        end
      end
    end

    context "when type is submit" do
      let(:button) { builder.cads_button(type: :submit) }

      it "renders a submit button" do
        render_inline button
        expect(page).to have_css "[type='submit']"
      end
    end

    context "with additional_attributes" do
      let(:button) do
        builder.cads_button(
          attributes: { "data-testid": "example" }
        )
      end

      it "allows additional attributes" do
        render_inline button
        expect(page).to have_css("[data-testid='example']")
      end
    end

    context "with left icon" do
      let(:button) { builder.cads_button(icon_left: :arrow_left) }

      it "renders a left icon" do
        render_inline button
        expect(page).to have_css ".cads-icon--arrow-left"
      end
    end

    context "with right icon" do
      let(:button) { builder.cads_button(icon_right: :arrow_right) }

      it "renders a right icon" do
        render_inline button
        expect(page).to have_css ".cads-icon--arrow-right"
      end
    end
  end
end
