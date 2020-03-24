class CuratedListSerializer
  def initialize(curated_lists)
    @curated_lists = curated_lists
  end

  def to_json(*_args)
    JSON.generate(@curated_lists.map do |curated_list|
      {
        "name" => curated_list.name,
        "description" => curated_list.description,
        "articles" => curated_list.articles.map do |article|
          {
            "title" => article.title,
            "slug" => article.slug
          }
        end
      }
    end)
  end
end
