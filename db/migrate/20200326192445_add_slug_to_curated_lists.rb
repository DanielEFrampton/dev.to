class AddSlugToCuratedLists < ActiveRecord::Migration[5.2]
  def change
    add_column :curated_lists, :slug, :string
  end
end
