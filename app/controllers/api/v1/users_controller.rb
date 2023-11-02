class Api::V1::UsersController < ApplicationController
  def show
    # Add error handling
    render json: User.find(params[:id])
  end
end
