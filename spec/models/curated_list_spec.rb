require "rails_helper"

describe CuratedList do
  describe "validations" do
    it { is_expected.to validate_presence_of :name }
    it { is_expected.to validate_presence_of :description }
  end

  describe "relationships" do
    it { is_expected.to belong_to :user }
    it { is_expected.to have_many :curated_list_articles }
    it { is_expected.to have_many(:articles).through(:curated_list_articles) }
  end
end
