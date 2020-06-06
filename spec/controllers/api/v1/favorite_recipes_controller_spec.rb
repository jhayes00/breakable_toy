require 'rails_helper'

RSpec.describe Api::V1::FavoriteRecipesController, type: :controller do
  describe "POST#create" do
    let!(:user1) { FactoryBot.create(:user) }
    let!(:recipe1) { FactoryBot.create(:recipe) }

    let!(:favorite_recipe_data) { { recipe_id: recipe1.id } }

    it "adds a new favorite recipe to the user only once" do
      sign_in user1

      before_count = user1.favorite_recipes.count
      post :create, params: favorite_recipe_data, format: :json
      after_count = user1.favorite_recipes.count

      expect(after_count).to eq (before_count + 1)

      before_count = user1.favorite_recipes.count
      post :create, params: favorite_recipe_data, format: :json
      after_count = user1.favorite_recipes.count

      expect(after_count).to eq (before_count)
    end
  end

  describe("POST#destroy") do
    let!(:user1) { FactoryBot.create(:user) }
    let!(:recipe1) { FactoryBot.create(:recipe) }
    let!(:favorite_recipe1) { FavoriteRecipe.create(
      user: user1,
      recipe: recipe1,
    )}

    it "removes an favorite recipe from the user" do
      sign_in user1

      before_delete_count = user1.favorite_recipes.count
      delete :destroy, params: { user_id: user1.id, id: recipe1.id }
      after_delete_count = user1.favorite_recipes.count

      expect(after_delete_count).to eq(before_delete_count - 1)
    end
  end
end
