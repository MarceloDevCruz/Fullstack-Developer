class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:show, :edit, :create, :update, :destroy]

  def index
    if current_user.admin?
      @users = ::User.all
      render json: ::UserSerializer.new(@users).serializable_hash, status: :ok
    else
      render json: { error: I18n.t('controllers.user.unauthorized') }, status: :forbidden
    end
  end

  def show
    if current_user.admin? || current_user.id == @user.id
      render json: ::UserSerializer.new(@user).serializable_hash, status: :ok
    else
      render json: { error: I18n.t('controllers.user.unauthorized') }, status: :forbidden
    end
  end

  def edit
    if current_user.admin? || current_user.id == @user.id
      render json: ::EditUserSerializer.new(@user).serializable_hash, status: :ok
    else
      render json: { error: I18n.t('controllers.user.unauthorized') }, status: :forbidden
    end
  end

  def create
    if current_user.admin?
      @user = ::User.new(user_params)
      if @user.save
        render json: ::UserSerializer.new(@user).serializable_hash, status: :created
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  def update
    if current_user.admin? || current_user.id == @user.id
      if @user.update(user_params)
        render json: ::UserSerializer.new(@user).serializable_hash, status: :ok
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: I18n.t('controllers.user.unauthorized') }, status: :forbidden
    end
  end

  def destroy
    if current_user.admin?
      if @user.destroy
        render json: {}, status: :ok
      else
        render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: I18n.t('controllers.user.unauthorized') }, status: :forbidden
    end
  end

  private

  def set_user
    @user = ::User.find(params[:id]) || current_user
  end

  def user_params
    params.require(:user).permit(
      :email, :full_name, :avatar, :role, :password, :password_confirmation
    )
  end
end