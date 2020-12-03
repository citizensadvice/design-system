# frozen_string_literal: true

module Drivers
  class Local
    include Helpers::Drivers

    def register
      ::CaTesting::Drivers::Local.new(browser).register
    end
  end
end
