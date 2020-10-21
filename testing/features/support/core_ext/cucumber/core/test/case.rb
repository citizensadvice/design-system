# frozen_string_literal: true

module Cucumber
  module Core
    module Test
      class Case
        def feature_file_name
          feature_file_path.split("/").last.split(".").first
        end

        private

        def feature_file_path
          location.to_s
        end
      end
    end
  end
end
