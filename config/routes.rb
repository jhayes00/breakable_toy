Rails.application.routes.draw do
  root 'homes#index'

  devise_for :users

  namespace :api do
    namespace :v1 do
      resources :pantry_items, only: [:index]
      resources :recipes, only: [:index]
    end
  end

  get "/recipes", to: 'homes#index'
  get "/pantry", to: 'homes#index'
end
