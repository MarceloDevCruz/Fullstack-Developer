class Api::V1::UsersController < ApplicationController
  def index
    users = ::User.all
    render json: ::UserSerializer.new(users).serializable_hash, status: :ok
  end

  def show
    user = ::User.find(params[:id])
    render json: ::UserSerializer.new(user).serializable_hash, status: :ok
  end

  private

  def user_params
    params.require(:user).permit(:email, :full_name, :role)
  end
end