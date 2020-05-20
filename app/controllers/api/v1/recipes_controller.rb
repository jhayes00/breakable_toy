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
    parsed_response = JSON.parse(response.body)
    render json: parsed_response
  end

  def show
    if Recipe.any? {|recipe| recipe[:id] == params[:id].to_i}
      render json: Recipe.find(params[:id])
    else
      response = Faraday.get("https://api.spoonacular.com/recipes/#{params[:id]}/information?includeNutrition=false&apiKey=#{ENV["API_KEY"]}")
      parsed_response = JSON.parse(response.body)

      new_recipe = Recipe.new(
        id: params[:id],
        image: parsed_response["image"],
        title: parsed_response["title"],
        source_url: parsed_response["sourceUrl"],
        source_name: parsed_response["sourceName"],
        servings: parsed_response["servings"],
        ready_in_minutes: parsed_response["readyInMinutes"],
        spoonacular_score: parsed_response["spoonacularScore"],
        num_likes: parsed_response["aggregateLikes"],
        extended_ingredients: parsed_response["extendedIngredients"],
        analyzed_instructions: parsed_response["analyzedInstructions"],
      )

      new_recipe.save

      render json: new_recipe
    end
  end
end
