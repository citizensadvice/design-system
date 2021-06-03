# frozen_string_literal: true

module CitizensAdviceComponents
    class Breadcrumbs < Base
      attr_reader :type, :links
  
      def initialize(type:, links:)
        super
        @type = fetch_or_fallback(allowed_values: %i[collapse no_collapse], given_value: type, fallback: :collapse )
        @links = links.each do |link|
            link.symbolize_keys!
        end
      end
    end
  end
  