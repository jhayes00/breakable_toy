class Recipe < ApplicationRecord
  has_many :ingredients
  has_many :favorite_recipes
  has_many :users, through: :favorite_recipes

  serialize :analyzed_instructions
  serialize :extended_ingredients

  validates :title, presence: true
end
