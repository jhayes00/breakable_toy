class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :favorite_recipes
  has_many :recipes, through: :favorite_recipes
  
  has_many :items
  has_many :ingredients, through: :items
end
