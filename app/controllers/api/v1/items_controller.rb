class Api::V1::ItemsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: Item.all
  end

  def create
    new_item = Item.new(item_params)
    new_item.user = current_user
    
    if new_item.save
      render json: new_item
    else
      errors_array = new_item.errors.full_messages
      formatted_errors = errors_array.each { |error|
        # if error.include?("Player num")
        #   error.sub!("num", "number")
        # end
      }
      render json: { errors: formatted_errors.to_sentence }, status: :unprocessable_entity
    end
  end

  private

  def item_params
    # if !params[:photo] || params[:photo].strip.empty?
    #   params.require(:game).permit(:name, :description, :player_num)
    # else
      params.require(:item).permit(:name, :quantity)
    # end
  end
end
