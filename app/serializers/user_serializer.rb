class UserSerializer < ActiveModel::Serializer
  attributes :id, :email

  has_many :favorite_recipes
  has_many :recipes, through: :favorite_recipes
end
