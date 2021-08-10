# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::FetchOrFallbackHelper, type: :component do
  subject(:instance) { test_class.new }

  let(:test_class) do
    Class.new do
      include CitizensAdviceComponents::FetchOrFallbackHelper
    end
  end

  it "fetches value when in allowed_values" do
    expect(
      instance.fetch_or_fallback(
        allowed_values: %i[adviser example important],
        given_value: :adviser,
        fallback: nil
      )
    ).to eq :adviser
  end

  context "with production rails env" do
    before do
      allow(Rails.env).to receive(:production?).and_return(true)
    end

    it "returns fallback when not in allowed_values" do
      [0, nil, "1", "one", false, true].each do |given_value|
        result = instance.fetch_or_fallback(
          allowed_values: [1, 2, 3],
          given_value: given_value,
          fallback: 2
        )
        expect(result).to eq 2
      end
    end
  end

  context "with non-production rails env" do
    before do
      allow(Rails.env).to receive(:production?).and_return(false)
    end

    it "raises error in non-production environments" do
      expect do
        instance.fetch_or_fallback(
          allowed_values: %i[adviser example important],
          given_value: :not_allowed,
          fallback: nil
        )
      end.to raise_error(CitizensAdviceComponents::FetchOrFallbackHelper::InvalidValueError)
    end
  end
end
