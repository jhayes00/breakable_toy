class AddColumnsToItems < ActiveRecord::Migration[5.2]
  def change
    change_table :items do |t|
      t.integer :quantity
      t.belongs_to :user
      t.belongs_to :ingredient
    end
  end
end
