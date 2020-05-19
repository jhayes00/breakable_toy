class AddManyColumnsToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :source_url, :string
    add_column :recipes, :source_name, :string
    add_column :recipes, :servings, :string
    add_column :recipes, :ready_in_minutes, :string
    add_column :recipes, :spoonacular_score, :string
    add_column :recipes, :analyzed_instructions, :text
    add_column :recipes, :extended_ingredients, :text
  end
end
