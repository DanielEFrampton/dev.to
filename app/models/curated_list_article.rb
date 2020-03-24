class CuratedListArticle < ApplicationRecord
  belongs_to :curated_list
  belongs_to :article
end
