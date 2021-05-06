# frozen_string_literal: true

RSpec.describe CitizensAdviceComponents::BaseComponent, type: :component do
  describe "#fetch_or_fallback" do
    let(:subject) { described_class.new }
    let(:allowed_values) { [1, 2, 3] }

    it "returns value when in allowed_values" do
      result = subject.fetch_or_fallback(
        allowed_values: allowed_values,
        given_value: 3,
        fallback: 2
      )
      expect(result).to eq 3
    end

    context "production rails env" do
      before do
        allow(Rails.env).to receive(:production?).and_return(true)
      end

      it "returns fallback when not in allowed_values" do
        [0, nil, "1", "one", false, true].each do |given_value|
          result = subject.fetch_or_fallback(
            allowed_values: [1, 2, 3],
            given_value: given_value,
            fallback: 2
          )
          expect(result).to eq 2
        end
      end
    end

    context "non-production rails env" do
      before do
        allow(Rails.env).to receive(:production?).and_return(false)
      end

      it "raises error in non-production environments" do
        expect do
          subject.fetch_or_fallback(
            allowed_values: [1, 2, 3],
            given_value: 4,
            fallback: 2
          )
        end.to raise_error(CitizensAdviceComponents::FetchOrFallbackHelper::InvalidValueError)
      end
    end
  end
end
