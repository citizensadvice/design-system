# frozen_string_literal: true

class Home < SitePrism::Page
  set_url "/"

  section :footer, Footer, "footer"
  section :header, Header, "header"
  section :navigation, Navigation, "nav"

  element :english_overlay_option, '#home-extent-popup [lang="en-GB"]'
  element :main_header, "#main h1"
  element :cookie_alert, ".hide-no-js .button--blue.cookie-monster__close"
  element :username, field: "Username"
  element :password, field: "Password"
  element :sign_in, "input[value='Sign in']"
  element :home_extent_popup_link, "a.home-extent-popup__link", text: "England"
  element :sign_out, ".main-header__logout__button", text: "Sign out"
  element :home_page_Sign_in, "a[class='hide-offline main-header__login']"
end
