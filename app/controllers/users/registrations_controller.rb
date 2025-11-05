module Users
  class RegistrationsController < Devise::RegistrationsController
    before_action :redirect_if_authenticated, only: [:new]

    private

    def redirect_if_authenticated
      return unless user_signed_in?
      redirect_to(current_user.admin? ? root_path : "/perfil/#{current_user.slug}")
    end

    protected

    def after_sign_up_path_for(resource)
      "/perfil/#{resource.slug}"
    end
  
  end
end