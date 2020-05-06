Rails.application.routes.draw do
  root 'homes#index'

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :items, only: [:index, :create]
      resources :recipes, only: [:index, :search]
    end
  end

  get "/recipes", to: 'homes#index'
  get "/pantry", to: 'homes#index'
end
