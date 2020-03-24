class CreateCuratedListArticles < ActiveRecord::Migration[5.2]
  def change
    create_table :curated_list_articles do |t|
      t.references :curated_list, foreign_key: true
      t.references :article, foreign_key: true

      t.timestamps
    end
  end
end
