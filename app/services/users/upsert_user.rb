class Users::UpsertUser
  Result = Struct.new(:ok, :message, keyword_init: true)

  def call(full_name:, email:, role:)
    full_name = full_name
    email = email
    role = role

    return Result.new(ok: false, message: I18n.t("services.users.upsert_user.errors.required")) if full_name.blank? || email.blank?
    return Result.new(ok: false, message: I18n.t("services.users.upsert_user.errors.invalid_email", email: email)) unless email.match?(Devise.email_regexp)

    user = User.find_or_initialize_by(email: email)
    user.full_name = full_name
    user.role = role
    user.password ||= SecureRandom.base58(12)
    user.password_confirmation ||= user.password

    if user.save
      Result.new(ok: true, message: I18n.t("services.users.upsert_user.success.created_or_updated", email: email, role: role))
    else
      Result.new(ok: false, message: I18n.t("services.users.upsert_user.errors.generic", email: email, details: user.errors.full_messages.to_sentence))
    end
  rescue => e
    safe_email = email.presence || I18n.t("services.users.upsert_user.errors.email_missing")
    Result.new(ok: false, message: I18n.t("services.users.upsert_user.errors.exception", email: safe_email, message: e.message))
  end
end
