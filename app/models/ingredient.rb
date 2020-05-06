class Ingredient < ApplicationRecord
  belongs_to :recipe
  has_many :items
  has_many :users, through: :items

  validates :name, null: false
end
