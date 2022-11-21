# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Header, type: :component do
  subject { page }

  describe "no slots" do
    before { render_inline described_class.new }

    it { is_expected.not_to have_selector "header" }
  end

  describe "logo slot" do
    context "with default logo" do
      before do
        render_inline(described_class.new) do |c|
          c.logo(title: "Logo title", url: "/homepage")
        end
      end

      it { is_expected.to have_link "Logo title", href: "/homepage" }

      it "does not show right column when only logo is present" do
        expect(page).not_to have_selector ".cads-header__search-row"
      end
    end

    context "with custom block" do
      before do
        render_inline(described_class.new) do |c|
          c.logo { "Custom logo HTML" }
        end
      end

      it { is_expected.to have_text "Custom logo HTML" }
    end
  end

  describe "skip_links slot" do
    context "with default skip_links" do
      before do
        render_inline(described_class.new) do |c|
          c.logo(title: "Logo title", url: "/")
        end
      end

      it { is_expected.to have_selector ".cads-skip-links a", count: 3 }
      it { is_expected.to have_link "Skip to navigation", href: "#cads-navigation" }
      it { is_expected.to have_link "Skip to main content", href: "#cads-main-content" }
      it { is_expected.to have_link "Skip to footer", href: "#cads-footer" }
    end

    context "with custom skip links" do
      before do
        render_inline(described_class.new) do |c|
          c.logo(title: "Logo title", url: "/")
          c.skip_links([{ title: "Skip to main content", url: "#content" }])
        end
      end

      it { is_expected.to have_selector ".cads-skip-links a", count: 1 }
      it { is_expected.to have_link "Skip to main content", href: "#content" }
    end
  end

  describe "header_links slot" do
    before do
      render_inline(described_class.new) do |c|
        c.logo(title: "Logo title", url: "/")
        c.header_links([
          { title: "Public site", url: "/", current_site: true },
          { title: "Intranet", url: "/intranet" },
          { title: "Cymraeg", url: "/cymraeg" }
        ])
      end
    end

    it { is_expected.to have_selector ".cads-header__links a", count: 2 }
    it { is_expected.to have_selector "span", text: "Public site" }
    it { is_expected.to have_link "Intranet", href: "/intranet" }
    it { is_expected.to have_link "Cymraeg", href: "/cymraeg" }
  end

  describe "account_link slot" do
    context "with plain link" do
      before do
        render_inline(described_class.new) do |c|
          c.logo(title: "Logo title", url: "/")
          c.account_link(title: "Sign out", url: "/sign-out")
        end
      end

      it { is_expected.to have_link "Sign out", href: "/sign-out" }
    end

    context "with custom block" do
      before do
        render_inline(described_class.new) do |c|
          c.logo(title: "Logo title", url: "/")
          c.account_link do
            "Custom account link HTML"
          end
        end
      end

      it { is_expected.to have_text "Custom account link HTML" }
    end
  end

  describe "search_form slot" do
    before do
      render_inline(described_class.new) do |c|
        c.logo(title: "Logo title", url: "/")
        c.search_form(search_action_url: "/search")
      end
    end

    it { is_expected.to have_selector "form[role=search]" }
    it { is_expected.to have_selector "form[action='/search']" }

    it { is_expected.to have_field "Search through site content" }

    it { is_expected.to have_button "Open search" }

    context "when welsh language" do
      around { |example| I18n.with_locale(:cy) { example.run } }

      it { is_expected.to have_field "Chwiliwch trwy gynnwys y wefan" }
      it { is_expected.to have_button "Ymchwiliad agored" }
    end
  end
end
