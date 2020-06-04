class FavoriteRecipeSerializer < ActiveModel::Serializer
  attributes :id, :recipe, :user

  belongs_to :recipe
  belongs_to :user
end
