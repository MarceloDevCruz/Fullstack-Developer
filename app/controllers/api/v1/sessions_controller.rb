class Api::V1::SessionsController < ApplicationController
  def me
    if current_user
      render json: ::UserSerializer.new(current_user).serializable_hash, status: :ok
    else
      render json: { data: nil }, status: :ok
    end
  end
end
