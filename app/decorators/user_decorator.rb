class UserDecorator < Draper::Decorator
  delegate_all

  def role
    I18n.t("activerecord.enums.user.role.#{object.role}")
  end
end