Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :items, only: [:index, :create, :edit, :update, :destroy]
      resources :recipes, only: [:index, :show] do
        resources :favorite_recipes, only: [:create, :show]
      end
      resources :ingredients, only: [:show]
      resources :users, only: [:show] do
        resources :favorite_recipes, only: [:destroy]
      end
    end
  end

  authenticated :user do
    root :to => redirect("/pantry")
  end
  root :to => redirect("/users/sign_in")

  get "/recipes", to: 'homes#index'
  get "/recipes/:id", to: 'homes#index'
  get "/pantry", to: 'homes#index'
  get "/users/:id", to: "homes#index"
end
