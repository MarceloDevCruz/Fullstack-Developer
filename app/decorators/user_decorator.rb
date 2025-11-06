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

  class << self
    def total_users_by_role
      counts = ::User.group(:role).count
      ::User.roles.keys.index_with { |r| counts[r] || 0 }
    end

    def total_users_by_role_human
      total_users_by_role.transform_keys do |role|
        I18n.t("activerecord.enums.user.role.#{role}")
      end
    end

    def dashboard_stats
      {
        total_users: ::User.count,
        total_users_by_role: total_users_by_role,
        total_users_by_role_human: total_users_by_role_human
      }
    end
  end
end