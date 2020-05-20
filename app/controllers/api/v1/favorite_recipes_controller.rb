class Api::V1::FavoriteRecipesController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def create
    new_favorite_recipe = FavoriteRecipe.new(recipe_id: params["recipe_id"])
    new_favorite_recipe.user = current_user
    binding.pry
    if new_favorite_recipe.save
      flash.now[:notice] = "Recipe added to favorites!"
    else
      flash.now[:notice] = new_favorite_recipe.errors.full_messages
    end
  end
end
