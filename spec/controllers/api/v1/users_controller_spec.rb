require 'rails_helper'

RSpec.describe Api::V1::UsersController, type: :controller do
  describe "GET#show" do
    let!(:user1) { FactoryBot.create(:user) }
    let!(:recipe1) { FactoryBot.create(:recipe) }
    let!(:favorite_recipe1) { FavoriteRecipe.create(
      user: user1,
      recipe: recipe1
    )}

    it "returns successful response code and json content" do
      sign_in user1
      get :show, params: { id: user1.id }

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'
    end

    it "returns correct user" do
      sign_in user1
      num_attributes = 4

      get :show, params: { id: user1.id }
      api_response = JSON.parse(response.body)

      expect(api_response.length).to eq num_attributes

      expect(api_response['email']).to eq user1.email
      expect(api_response['favorite_recipes'][0]['recipe']['title']).to eq recipe1.title
    end
  end
end
