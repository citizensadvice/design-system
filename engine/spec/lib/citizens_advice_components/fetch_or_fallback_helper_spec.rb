# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FetchOrFallbackHelper, type: :component do
  subject(:test_class) do
    Class.new do
      include CitizensAdviceComponents::FetchOrFallbackHelper

      attr_reader :type

      def initialize(type:)
        @type = fetch_or_fallback(
          allowed_values: %i[adviser example important],
          given_value: type,
          fallback: :adviser
        )
      end
    end
  end

  it "fetches value when in allowed_values" do
    expect(test_class.new(type: :example).type).to eq :example
  end

  context "with production rails env" do
    before do
      allow(Rails.env).to receive(:production?).and_return(true)
    end

    it "returns fallback when not in allowed_values" do
      [0, nil, "1", "one", false, true].each do |given_value|
        expect(test_class.new(type: given_value).type).to eq :adviser
      end
    end
  end

  context "with non-production rails env" do
    before do
      allow(Rails.env).to receive(:production?).and_return(false)
    end

    it "raises error in non-production environments" do
      expect do
        test_class.new(type: :not_allowed)
      end.to raise_error(CitizensAdviceComponents::FetchOrFallbackHelper::InvalidValueError)
    end
  end
end
