class FavoriteRecipeSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :recipe
  belongs_to :user
end
