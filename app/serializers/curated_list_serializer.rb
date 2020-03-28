class CuratedListSerializer
  def initialize(curated_lists)
    @curated_lists = curated_lists
  end

  def to_json(*_args)
    JSON.generate(@curated_lists.map do |curated_list|
      {
        "name" => curated_list.name,
        "description" => curated_list.description,
        "slug" => curated_list.slug,
        "articles" => curated_list.articles.map do |article| 
          article.to_json
        end
      }
    end)
  end
end
