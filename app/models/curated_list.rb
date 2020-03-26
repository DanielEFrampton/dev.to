class CuratedList < ApplicationRecord
  validates :name, :description, :slug, presence: true

  belongs_to :user
  has_many :curated_list_articles
  has_many :articles, through: :curated_list_articles
end
