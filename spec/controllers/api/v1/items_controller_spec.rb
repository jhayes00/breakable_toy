require 'rails_helper'

RSpec.describe Api::V1::ItemsController, type: :controller do
  describe "GET#index" do
    let!(:user1) { FactoryBot.create(:user) }
    let!(:item1) { Item.create(
      user: user1,
      name: 'butter',
      quantity: 4
    )}
    let!(:item2) { Item.create(
      user: user1,
      name: 'salt'
    )}

    it "returns successful response code and json content" do
      sign_in user1
      get :index

      expect(response.status).to eq 200
      expect(response.content_type).to eq 'application/json'
    end

    it "returns all pantry items in the db" do
      sign_in user1
      get :index

      api_response = JSON.parse(response.body)

      expect(api_response.length).to eq 2

      expect(api_response[0]['name']).to eq item1.name
      expect(api_response[0]['quantity']).to eq item1.quantity
      expect(api_response[1]['name']).to eq item2.name
    end
  end

  describe "POST#create" do
    let!(:user1) { FactoryBot.create(:user) }
    let!(:good_item_data) { { item: {
      user: user1,
      name: 'butter',
      quantity: 4
    } } }
    let!(:bad_item_data) { { item: {
      user: user1,
      quantity: 3
    } } }

    it "adds a new item to the db" do
      sign_in user1

      before_count = Item.count
      post :create, params: good_item_data, format: :json
      after_count = Item.count

      expect(after_count).to eq (before_count + 1)
    end

    it "returns the new item as json" do
      sign_in user1
      num_attributes = 7

      post :create, params: good_item_data, format: :json
      api_response = JSON.parse(response.body)

      expect(api_response.length).to eq num_attributes
      expect(api_response["user_id"]).to eq good_item_data[:item][:user][:id]
      expect(api_response["name"]).to eq good_item_data[:item][:name]
      expect(api_response["quantity"]).to eq good_item_data[:item][:quantity]
    end

    it "does not add incomplete/bad info to db" do
      sign_in user1

      before_count = Item.count
      post :create, params: bad_item_data, format: :json
      after_count = Item.count

      expect(after_count).to eq before_count
    end

    it "returns validation error json" do
      sign_in user1
      num_attributes = 7

      post :create, params: bad_item_data, format: :json
      api_response = JSON.parse(response.body)

      expect(api_response["errors"]).to eq "Name can't be blank"
    end
  end

  describe("POST#update") do
    let!(:user1) { FactoryBot.create(:user) }
    let!(:user2) { FactoryBot.create(:user) }
    let!(:item1) { Item.create(
      user: user1,
      name: 'butter',
      quantity: 4
    )}
    let!(:item2) { Item.create(
      user: user2,
      name: 'salt'
    )}

    it "does not add an additional item to the db" do
      sign_in user1

      before_update_count = Item.count
      updated_item_params = {
        name: 'margarine',
        quantity: 2
      }
      patch :update, params: { id: item1.id, item: updated_item_params }
      after_update_count = Item.count

      expect(before_update_count).to eq after_update_count
    end

    it "returns the updated item" do
      sign_in user1

      updated_item_params = {
        name: 'margarine',
        quantity: 2
      }

      patch :update, params: { id: item1.id, item: updated_item_params }
      api_response = JSON.parse(response.body)

      expect(api_response['id']).to eq item1.id
      expect(api_response['name']).to eq updated_item_params[:name]
      expect(api_response['quantity']).to eq updated_item_params[:quantity]
      expect(api_response['user_id']).to eq item1.user.id
    end

    it "returns errors with poor data" do
      sign_in user2

      updated_item_params = {
        name: ' ',
        quantity: 2
      }

      patch :update, params: { id: item2.id, item: updated_item_params }
      api_response = JSON.parse(response.body)

      expect(api_response['errors']).to eq "Name can't be blank"
    end
  end

  describe("POST#destroy") do
    let!(:user1) { FactoryBot.create(:user) }
    let!(:item1) { Item.create(
      user: user1,
      name: 'butter',
      quantity: 4
    )}
    let!(:item2) { Item.create(
      user: user1,
      name: 'salt'
    )}

    it "removes an item from the database" do
      sign_in user1

      before_delete_count = Item.count
      delete :destroy, params: { id: item1.id }
      after_delete_count = Item.count

      expect(after_delete_count).to eq(before_delete_count - 1)
    end

    it "returns true when it removes the item" do
      sign_in user1

      delete :destroy, params: { id: item1.id }
      api_response = JSON.parse(response.body)

      expect(api_response['id']).to eq item1.id
      expect(api_response['name']).to eq item1.name
      expect(api_response['quantity']).to eq item1.quantity
      expect(api_response['user_id']).to eq item1.user.id
    end
  end
end
