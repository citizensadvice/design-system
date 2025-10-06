# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FormBuilder do
  include FormBuilderTestHelpers

  subject { page }

  let(:model) { ExampleForm.invalid_example }
  let(:builder) { form_builder_for(model) }

  describe "#cads_button" do
    context "with default arguments" do
      before do
        render_inline builder.cads_button
      end

      it "renders a default button" do
        expect(page).to have_button text: "Save changes"
      end
    end

    describe "variant" do
      let(:builder_method) { builder.cads_button(variant: variant) }

      context "when missing variant" do
        let(:variant) { nil }

        it "renders a primary button" do
          without_fetch_or_fallback_raises do
            render_inline builder_method
            expect(page).to have_css ".cads-button__primary"
          end
        end
      end

      context "when variant is primary" do
        let(:variant) { :primary }

        it "renders a primary button" do
          render_inline builder_method
          expect(page).to have_css ".cads-button__primary"
        end
      end

      context "when variant is secondary" do
        let(:variant) { :secondary }

        it "renders a secondary button" do
          render_inline builder_method
          expect(page).to have_css ".cads-button__secondary"
        end
      end
    end

    describe "type" do
      let(:builder_method) { builder.cads_button(type: type) }

      context "when missing type" do
        let(:type) { nil }

        it "renders a button type" do
          without_fetch_or_fallback_raises do
            render_inline builder_method
            expect(page).to have_css "[type='button']"
          end
        end
      end

      context "when type is submit" do
        let(:type) { :submit }

        it "renders a submit button" do
          render_inline builder_method
          expect(page).to have_css "[type='submit']"
        end
      end
    end

    describe "additional_attributes" do
      before do
        render_inline builder.cads_button(
          attributes: { "data-testid": "example" }
        )
      end

      it "allows additional attributes" do
        expect(page).to have_css("[data-testid='example']")
      end
    end

    describe "icons" do
      before do
        render_inline builder_method
      end

      context "with left icon" do
        let(:builder_method) { builder.cads_button(icon_left: :arrow_left) }

        it "renders a left icon" do
          expect(page).to have_css ".cads-icon--arrow-left"
        end
      end

      context "with right icon" do
        let(:builder_method) { builder.cads_button(icon_right: :arrow_right) }

        it "renders a right icon" do
          expect(page).to have_css ".cads-icon--arrow-right"
        end
      end
    end
  end
end
