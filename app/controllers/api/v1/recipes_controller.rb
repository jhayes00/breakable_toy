class Api::V1::RecipesController < ApplicationController
  before_action :authenticate_user!
  
  def index
    pantry_items_query = ""
    pantry_items = current_user.items
    pantry_items.each do |item|
      if (pantry_items_query != "")
        pantry_items_query += ',+'
      end
      pantry_items_query += item.name
    end
    pantry_items_query = pantry_items_query.gsub(' ', '+')

    response = Faraday.get("https://api.spoonacular.com/recipes/findByIngredients?ingredients=#{pantry_items_query}&number=12&ranking=1&apiKey=#{ENV["API_KEY"]}")
    # response = Faraday.get("https://api.spoonacular.com/recipes/findByIngredients?ingredients=#{pantry_items_query}&number=12&ranking=2&apiKey=#{ENV["API_KEY"]}")
    parsed_response = JSON.parse(response.body)
    render json: parsed_response
  end

  def show
    response = Faraday.get("https://api.spoonacular.com/recipes/#{params[:id]}/information?includeNutrition=false&apiKey=#{ENV["API_KEY"]}")
    parsed_response = JSON.parse(response.body)
    render json: parsed_response
  end

  # def search
  #   # fetch here
  #   # use http party
  # end

end
