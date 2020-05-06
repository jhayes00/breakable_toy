class Api::V1::RecipesController < ApplicationController

  def index
    pantry_items_query = ""
    pantry_items = Item.all
    pantry_items.each do |item|
      if (pantry_items_query != "")
        pantry_items_query += ',+'
      end
      pantry_items_query += item.name
    end
    pantry_items_query = pantry_items_query.gsub(' ', '+')

    response = Faraday.get("https://api.spoonacular.com/recipes/findByIngredients?ingredients=#{pantry_items_query}&number=10&apiKey=#{ENV["API_KEY"]}")
    parsed_response = JSON.parse(response.body)

    render json: parsed_response
  end

  def search
    # fetch here
    # use http party
  end

end
