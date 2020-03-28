class CuratedListSerializer
  def initialize(curated_lists)
    @curated_lists = curated_lists
  end

  def to_json(*_args)
    JSON.generate(@curated_lists.map do |curated_list|
      {
        "id" => curated_list.id,
        "name" => curated_list.name,
        "description" => curated_list.description,
        "slug" => curated_list.slug,
        "articles" => curated_list.articles.map(&:to_json)
      }
    end)
  end
end
