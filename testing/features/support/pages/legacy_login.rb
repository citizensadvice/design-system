# frozen_string_literal: true

class LegacyLogin < SitePrism::Page
  element :login_field, ".form__control #RootPlaceHolder_RootPlaceHolder_LoginControl_LoginFormControl_Username"
  element :password_field, ".form__control #RootPlaceHolder_RootPlaceHolder_LoginControl_LoginFormControl_Password"
  element :submit, ".form__control #RootPlaceHolder_RootPlaceHolder_LoginControl_LoginFormControl_LoginButtonControl"

  def login
    login_field.send_keys("user")
    password_field.send_keys("rodeo123")
    submit.click
  end
end
