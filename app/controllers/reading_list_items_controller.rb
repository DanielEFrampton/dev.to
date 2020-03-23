class ReadingListItemsController < ApplicationController
  def index
    # Declares instance variable with boolean value
    @reading_list_items_index = true
    # Sets value of @view instance variable to either "valid" or "archive"
    # depending on which path was visited.
    set_view
    # Generates Algolia search key from environmental variables and the user's
    # ID retrieved from their session.
    generate_algolia_search_key
    # Index action implicitly renders `app/views/reading_list/index.html.erb`
  end

  def update
    @reaction = Reaction.find(params[:id])
    not_authorized if @reaction.user_id != session_current_user_id

    @reaction.status = params[:current_status] == "archived" ? "valid" : "archived"
    @reaction.save
    head :ok
  end

  private

  def generate_algolia_search_key
    params = { filters: "viewable_by:#{session_current_user_id}" }
    @secured_algolia_key = Algolia.generate_secured_api_key(
      ApplicationConfig["ALGOLIASEARCH_SEARCH_ONLY_KEY"], params
    )
  end

  def set_view
    @view = if params[:view] == "archive"
              "archived"
            else
              "valid"
            end
  end
end
