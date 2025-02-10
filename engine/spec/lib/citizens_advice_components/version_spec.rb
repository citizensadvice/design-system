# frozen_string_literal: true

RSpec.describe "CitizensAdviceComponents::VERSION" do
  it "matches package version" do
    package_json_path = CitizensAdviceComponents::Engine.root.join("../package.json")
    package_json = JSON.parse(File.read(package_json_path))
    expect(CitizensAdviceComponents::VERSION).to eq package_json["version"]
  end
end
