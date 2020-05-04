require 'rails_helper'

RSpec.describe Api::V1::RecipesController, type: :controller do
  describe "GET#index" do
    # let!(:pantry_item1) { FactoryBot.create(:pantry_item) }
    # let!(:pantry_item2) { FactoryBot.create(:pantry_item) }

    it "returns successful response code and json content" do
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'
    end

    it "returns all recipes in the db" do
      recipe1 = Recipe.create(title: 'Spaghetti and Meatballs')
      recipe2 = Recipe.create(title: 'Buffalo Chicken Wings')

      get :index
      api_response = JSON.parse(response.body)

      expect(api_response.length).to eq 2

      expect(api_response[0]['title']).to eq recipe1.title
      expect(api_response[1]['title']).to eq recipe2.title
    end
  end

  xdescribe "POST#create" do
    let!(:good_game_data) { { game: { name: "Game 1", description: "It's a game", player_num: "4" } } }
    let!(:bad_game_data) { { game: { name: "Game 2", description: "It's also a game" } } }

    it "adds a new game to the db" do
      before_count = Game.count
      post :create, params: good_game_data, format: :json
      after_count = Game.count

      expect(after_count).to eq (before_count + 1)
    end

    it "returns the new game as json" do
      post :create, params: good_game_data, format: :json
      api_response = JSON.parse(response.body)

      expect(api_response.length).to eq 9
      expect(api_response["name"]).to eq good_game_data[:game][:name]
      expect(api_response["description"]).to eq good_game_data[:game][:description]
      expect(api_response["player_num"]).to eq good_game_data[:game][:player_num]
    end

    it "does not add incomplete/bad info to db" do
      before_count = Game.count
      post :create, params: bad_game_data, format: :json
      after_count = Game.count

      expect(after_count).to eq before_count
    end

    it "returns validation error json" do
      post :create, params: bad_game_data, format: :json
      api_response = JSON.parse(response.body)

      expect(api_response["errors"]).to eq "Player number can't be blank"
    end
  end
end