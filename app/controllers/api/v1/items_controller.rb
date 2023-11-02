class Api::V1::ItemsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }
  before_action :authenticate_user!

  def index
    # Add error handling
    render json: current_user.items
  end

  def create
    new_item = Item.new(item_params)
    new_item.user = current_user
    if new_item.save
      render json: new_item
    else
      errors_array = new_item.errors.full_messages
      formatted_errors = errors_array.each { |error| }
      render json: { errors: formatted_errors.to_sentence }, status: :unprocessable_entity
    end
  end

  def update
    updated_item = Item.find(params[:id])
    if updated_item.update(item_params)
      render json: updated_item
    else
      render json: { errors: updated_item.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  def destroy
    deleted_item = Item.find(params[:id]).delete
    # Add error handling
    render json: deleted_item
  end

  private

  def item_params
    params.require(:item).permit(:name, :quantity)
  end
end
