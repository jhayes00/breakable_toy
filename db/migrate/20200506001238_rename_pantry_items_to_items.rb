class RenamePantryItemsToItems < ActiveRecord::Migration[5.2]
  def change
    rename_table :pantry_items, :items
  end
end
