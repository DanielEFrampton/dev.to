class CuratedListsController < ApplicationController
  def show
    found_list = CuratedList.where('user_id = ? AND slug = ?', id_for_username(params[:username]), params[:slug]).first.to_json
    @curated_list = CuratedListSerializer.new([found_list]).to_json
  end

  def create
    user = User.find(session_current_user_id)
    new_list = user.curated_lists.new(strong_params)
    if new_list.save
      flash[:success] = 'Hooray!'
    end
  end

  private

  def id_for_username(username)
    User.find_by(username: username).id
  end

  def strong_params
    params.permit(:name, :description)
  end
end
