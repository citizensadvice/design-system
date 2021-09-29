RSpec.describe CitizensAdviceComponents::Icons::Base, type: :component do
  subject(:component) do
    render_inline CitizensAdviceComponents::Icons::Base.new(
      size: size.presence,
      icon_name: "CitizensAdviceComponents::Icons::MyGreatIcon"
    )
  end

  let(:size) { :small }

  it "renders the icon" do
    expect(component.css("svg")).to be_present
  end

  it "renders the correct size class" do
    expect(component.css(".cads-icon--small")).to be_present
  end

  it "renders the correct icon class" do 
    expect(component.css(".cads-icon--my-great-icon")).to be_present
  end
end