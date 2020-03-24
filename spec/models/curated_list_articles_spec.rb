require "rails_helper"

describe CuratedListArticle do
  describe "relationships" do
    it { is_expected.to belong_to :curated_list }
    it { is_expected.to belong_to :article }
  end
end
