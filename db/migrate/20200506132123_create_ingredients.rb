class CreateIngredients < ActiveRecord::Migration[5.2]
  def change
    create_table :ingredients do |t|
      t.belongs_to :recipe
      t.string :name, null: false
      t.integer :quantity

      t.timestamps null: false
    end
  end
end
