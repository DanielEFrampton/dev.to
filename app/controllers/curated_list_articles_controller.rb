class CuratedListArticlesController < ApplicationController
  def create
    found_list = CuratedList.where("user_id = ? AND slug = ?",
                                   id_for_username(params[:username]),
                                   params[:slug]).
      first
    found_article = Article.find(params[:article_id])
    found_list.articles << found_article
    render json: CuratedListArticle.last.to_json
  end

  def destroy
    found_join = CuratedListArticle.where("curated_list_id = ? AND article_id = ?",
                                          params[:curated_list_id],
                                          params[:article_id]).
      first
    found_join.destroy
    render json: { result: "success" }.to_json
  end

  private

  def id_for_username(username)
    User.find_by(username: username).id
  end
end
