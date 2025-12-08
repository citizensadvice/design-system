# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FormBuilder do
  include FormBuilderTestHelpers

  subject { page }

  let(:model) { ExampleForm.valid_example }
  let(:builder) { form_builder_for(model) }

  describe "#cads_date_field" do
    context "with default arguments" do
      let(:field) { builder.cads_date_field(:date_of_purchase) }

      before do
        render_inline field
      end

      it "renders legend" do
        expect(page).to have_css "legend", text: "Date of purchase"
      end

      it "renders three input fields" do
        expect(page).to have_field "example_form[date_of_purchase(3i)]", with: model.date_of_purchase.day
        expect(page).to have_field "example_form[date_of_purchase(2i)]", with: model.date_of_purchase.month
        expect(page).to have_field "example_form[date_of_purchase(1i)]", with: model.date_of_purchase.year
      end

      it "is optional by default optional" do
        expect(page).to have_text "Date of purchase (optional)", normalize_ws: true
      end
    end

    context "when in Cymraeg" do
      let(:field) { builder.cads_date_field(:date_of_purchase) }

      before do
        render_inline field
      end

      around { |example| I18n.with_locale(:cy) { example.run } }

      it "translates field names" do
        expect(page).to have_text "Blwyddyn"
        expect(page).to have_text "Mis"
        expect(page).to have_text "Dydd"
      end

      it "translates optional text" do
        expect(page).to have_text "(dewisol)"
      end
    end

    context "with hint text" do
      let(:field) { builder.cads_date_field(:date_of_purchase, hint: "Example hint") }

      it "includes the hint text" do
        render_inline field
        expect(page).to have_text "Example hint"
      end
    end

    context "with 'page_heading' parameter" do
      let(:field) { builder.cads_date_field(:date_of_purchase, page_heading: true) }

      it "wraps the legend text in a page heading" do
        render_inline field
        expect(page).to have_css "legend h1.cads-page-title", text: "Date of purchase"
      end
    end

    context "with validation errors" do
      let(:model) { ExampleForm.invalid_example }
      let(:field) { builder.cads_date_field(:date_of_purchase) }

      before do
        model.valid? # trigger validation
        render_inline field
      end

      it "renders error message" do
        expect(page).to have_text "Date of purchase must be less than"
      end
    end
  end
end
