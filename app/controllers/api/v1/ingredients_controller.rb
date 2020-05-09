class Api::V1::IngredientsController < ApplicationController

  def show
    # binding.pry
    # response = Faraday.get("https://api.spoonacular.com/food/ingredients/substitutes?ingredientName=#{params[:name]}&apiKey=#{ENV["API_KEY"]}")
    parsed_response = JSON.parse(response.body)

    render json: parsed_response
  end

  # def search
  #   # fetch here
  #   # use http party
  # end

end
