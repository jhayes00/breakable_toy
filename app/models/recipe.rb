class Recipe < ApplicationRecord
  has_many :ingredients

  serialize :analyzed_instructions
  serialize :extended_ingredients

  validates :title, presence: true
end
