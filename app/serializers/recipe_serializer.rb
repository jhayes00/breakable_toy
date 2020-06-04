class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :image, :title, :source_url, :source_name, :servings,
    :ready_in_minutes, :spoonacular_score, :num_likes,
    :extended_ingredients, :analyzed_instructions

  def current_user
    scope
  end

  has_many :favorite_recipes
  has_many :users, through: :favorite_recipes
end
