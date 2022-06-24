# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::Header, type: :component do
  describe "no slots" do
    subject(:component) do
      render_inline(described_class.new)
    end

    it "does not render without any slots" do
      expect(component.at("header")).not_to be_present
    end
  end

  describe "logo slot" do
    context "with default logo" do
      subject(:logo) { component.at(".cads-logo") }

      let(:component) do
        render_inline(described_class.new) do |c|
          c.logo(title: "Logo title", url: "/homepage")
        end
      end

      it "has expected title" do
        expect(logo.attr("title")).to eq "Logo title"
      end

      it "has expected href" do
        expect(logo.attr("href")).to eq "/homepage"
      end
    end

    context "with custom block" do
      subject(:component) do
        render_inline(described_class.new) do |c|
          c.logo { "Custom logo HTML" }
        end
      end

      it "renders custom block" do
        expect(component.text).to include "Custom logo HTML"
      end
    end
  end

  describe "skip_links slot" do
    subject(:component) do
      render_inline(described_class.new) do |c|
        c.logo(title: "Logo title", url: "/")
        c.skip_links(skip_links)
      end
    end

    let(:skip_links) { [{ title: "Skip to content", url: "#content" }] }

    it "renders skip links" do
      links = component.css(".cads-skip-links a").map do |item|
        { url: item.attr("href"), title: item.text.strip }
      end

      expect(links).to eq skip_links
    end

    context "with default skip_links" do
      subject(:component) do
        render_inline(described_class.new) do |c|
          c.logo(title: "Logo title", url: "/")
        end
      end

      it "renders default skip links" do
        links = component.css(".cads-skip-links a").map do |item|
          { url: item.attr("href"), title: item.text.strip }
        end

        expect(links).to eq [
          { title: "Skip to navigation", url: "#cads-navigation" },
          { title: "Skip to content", url: "#cads-main-content" },
          { title: "Skip to footer", url: "#cads-footer" }
        ]
      end
    end
  end

  describe "header_links slot" do
    subject(:component) do
      render_inline(described_class.new) do |c|
        c.logo(title: "Logo title", url: "/")
        c.header_links([
          { title: "Public site", url: "/", current_site: true },
          { title: "Intranet", url: "/intranet" },
          { title: "Cymraeg", url: "?lang=cy" }
        ])
      end
    end

    it "renders header links" do
      expect(component.css(".cads-header__links li").size).to be 3
    end

    it "renders current site as a span" do
      expect(component.css(".cads-header__links span").text).to eq "Public site"
    end
  end

  describe "account_link slot" do
    context "with plain link" do
      let(:component) do
        render_inline(described_class.new) do |c|
          c.logo(title: "Logo title", url: "/")
          c.account_link(title: "Sign out", url: "/sign-out")
        end
      end

      let(:account_link) { component.at("a[data-testid=account-link]") }

      it "has expected link href" do
        expect(account_link.attr("href")).to eq "/sign-out"
      end

      it "has expected link text" do
        expect(account_link.text.strip).to eq "Sign out"
      end
    end

    context "with custom block" do
      subject(:component) do
        render_inline(described_class.new) do |c|
          c.logo(title: "Logo title", url: "/")
          c.account_link do
            "Custom account link HTML"
          end
        end
      end

      it "renders custom block" do
        expect(component.at("[data-testid=account-link]").text).to include "Custom account link HTML"
      end
    end
  end

  describe "search_form slot" do
    subject(:component) do
      render_inline(described_class.new) do |c|
        c.logo(title: "Logo title", url: "/")
        c.search_form(search_action_url: "/search")
      end
    end

    it "renders search form" do
      expect(component.at("form[role=search]").attr("action")).to eq "/search"
    end

    it "has descriptive label" do
      expect(component.at("input[type=search]").attr("aria-label")).to eq "Search through site content"
    end

    it "renders search toggle" do
      expect(component.at("button[aria-label='Open search']")).to be_present
    end

    context "when welsh language" do
      before { I18n.locale = :cy }

      it "has translated descriptive label" do
        expect(component.at("input[type=search]").attr("aria-label")).to eq "Chwiliwch trwy gynnwys y wefan"
      end

      it "has translated search label" do
        expect(component.at("button[aria-label='Ymchwiliad agored']")).to be_present
      end
    end
  end
end
