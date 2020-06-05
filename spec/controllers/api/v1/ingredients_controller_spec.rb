require 'rails_helper'

RSpec.describe Api::V1::IngredientsController, type: :controller do
  describe "GET#show" do
    let!(:user1) { FactoryBot.create(:user) }
    let!(:ingredient1) { Ingredient.create(
      name: "butter",
      id: 1001
    )}

    it "returns successful response code and json content" do
      sign_in user1
      get :show, params: { id: ingredient1.name }

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'
    end

    it "returns correct ingredient" do
      sign_in user1
      num_attributes = 4

      get :show, params: { id: ingredient1.name }
      api_response = JSON.parse(response.body)

      expect(api_response.length).to eq num_attributes

      expect(api_response['ingredient']).to eq ingredient1.name
    end
  end
end
