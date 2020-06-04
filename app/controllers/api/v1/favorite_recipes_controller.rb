class Api::V1::FavoriteRecipesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    new_favorite_recipe = FavoriteRecipe.new(recipe_id: params["recipe_id"])
    new_favorite_recipe.user = current_user

    if new_favorite_recipe.save
      favorite_recipe_message = {message: "Recipe added to favorites!"}
    else
      favorite_recipe_message = {message: new_favorite_recipe.errors.full_messages.to_sentence}
    end

    render json: favorite_recipe_message
  end

  def destroy
    deleted_favorite = current_user.favorite_recipes.find_by(recipe_id: params[:id]).delete
    render json: deleted_favorite
  end
end
