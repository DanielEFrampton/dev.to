require "rails_helper"

describe CuratedListSerializer do
  before do
    @curated_list = create(:curated_list)
    @article_1 = create(:article)
    @article_2 = create(:article)
    @curated_list.articles << [@article_1, @article_2]
    @serializer = described_class.new([@curated_list])
  end

  describe "methods" do
    describe "to_json" do
      it "returns curated list info as JSON" do
        expect(JSON.parse(@serializer.to_json)).to include(
          "name" => @curated_list.name,
          "description" => @curated_list.description,
          "articles" => [
            {
              "title" => @article_1.title,
              "slug" => @article_1.slug
            },
            {
              "title" => @article_2.title,
              "slug" => @article_2.slug
            },
          ],
        )
      end
    end
  end
end
