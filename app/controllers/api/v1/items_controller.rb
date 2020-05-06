class Api::V1::ItemsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: current_user.items
  end

  def create
    new_item = Item.new(item_params)
    new_item.user = current_user
    if new_item.save
      render json: new_item
    else
      errors_array = new_item.errors.full_messages
      formatted_errors = errors_array.each { |error|

      }
      render json: { errors: formatted_errors.to_sentence }, status: :unprocessable_entity
    end
  end

  private

  def item_params
    params.require(:item).permit(:name, :quantity)
  end
end
