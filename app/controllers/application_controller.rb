class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  before_action :configure_permitted_parameters, if: :devise_controller?
  allow_browser versions: :modern
  #skip_before_action :verify_authenticity_token

  layout "react", only: [:fallback_react_app]

  def fallback_react_app ; end

  def after_sign_in_path_for(resource)
    stored = stored_location_for(resource)
    return stored if stored.present?

    if resource.respond_to?(:admin?) && resource.admin?
      root_path
    else
      "/perfil/#{current_user.slug}"
    end
  end

 def after_sign_up_path_for(resource)
    "/perfil/#{resource.slug}"
  end

  def after_update_path_for(resource)
    new_user_session_path
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:full_name])
    devise_parameter_sanitizer.permit(:account_update, keys: [:full_name, :avatar])
  end
end
