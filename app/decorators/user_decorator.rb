class UserDecorator < Draper::Decorator
  delegate_all

  def role
    I18n.t("activerecord.enums.user.role.#{object.role}")
  end

  def avatar_url
    {src: avatar_path}
  end

  def avatar_path
    if model.avatar.attached?
      h.rails_blob_url(model.avatar, only_path: true)
    else
      h.asset_path('default_avatar.png')
    end
  end
end