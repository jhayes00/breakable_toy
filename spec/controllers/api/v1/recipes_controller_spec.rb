require 'rails_helper'

RSpec.describe Api::V1::RecipesController, type: :controller do
  describe "GET#index" do
    let!(:user1) { FactoryBot.create(:user) }
    let!(:item1) { Item.create(
      user: user1,
      name: 'spaghetti',
    )}
    let!(:item2) { Item.create(
      user: user1,
      name: 'bacon'
    )}
    let!(:item3) { Item.create(
      user: user1,
      name: 'eggs'
    )}

    it "returns successful response code and json content" do
      sign_in user1
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'
    end

    it "returns all recipes in the search" do
      sign_in user1
      get :index
      num_recipes = 12

      api_response = JSON.parse(response.body)

      expect(api_response.length).to eq num_recipes

      expect(api_response[0]['usedIngredients'].to_s.include?(item1.name)).to eq true
      expect(api_response[5]['usedIngredients'].to_s.include?(item2.name)).to eq true
      expect(api_response[11]['usedIngredients'].to_s.include?(item3.name)).to eq true
    end
  end

  describe "GET#show" do
    let!(:user1) { FactoryBot.create(:user) }
    let!(:recipe1) { FactoryBot.create(:recipe) }
    let!(:recipe2) { FactoryBot.create(:recipe) }

    it "returns successful response code and json content" do
      sign_in user1
      get :show, params: { id: recipe1.id }

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'
    end

    it "returns correct recipe" do
      sign_in user1
      num_attributes = 13

      get :show, params: { id: recipe1.id }
      api_response = JSON.parse(response.body)

      expect(api_response.length).to eq num_attributes

      expect(api_response['title']).to eq recipe1.title
    end
  end
end
