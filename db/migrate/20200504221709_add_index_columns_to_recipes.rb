class AddIndexColumnsToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :image, :string
    add_column :recipes, :num_likes, :integer
    add_column :recipes, :num_missed_ingredients, :integer
  end
end
