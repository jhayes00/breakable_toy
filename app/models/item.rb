class Item < ApplicationRecord
  belongs_to :user
  belongs_to :ingredient, optional: true

  validates :name, null: false
end
