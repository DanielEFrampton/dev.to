class CuratedListArticlesController < ApplicationController
  def create
    found_list = CuratedList.where("user_id = ? AND slug = ?", id_for_username(params[:username]), params[:slug]).first
    found_article = Article.find(params[:article_id])
    found_list.articles << found_article
    render json: CuratedListArticle.last.to_json
  end

  def id_for_username(username)
    User.find_by(username: username).id
  end
end
