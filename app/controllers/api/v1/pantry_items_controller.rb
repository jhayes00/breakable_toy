class Api::V1::PantryItemsController < ApplicationController
  def index
    render json: PantryItem.all
  end
end
