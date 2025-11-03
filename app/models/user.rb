class User < ApplicationRecord
  extend FriendlyId

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one_attached :avatar
  enum :role, { admin: "admin", user: "user" }

  friendly_id :full_name, use: :slugged

  validates :full_name, presence: true, length: { minimum: 10, maximum: 100 }
  validates :email,
            presence: true,
            uniqueness: { case_sensitive: false },
            format: { with: Devise.email_regexp }
  validate :validate_avatar_type_and_size

  def should_generate_new_friendly_id?
    full_name_changed?
  end

  private
  def validate_avatar_type_and_size
    return unless avatar.attached?

    allowed = %w[image/png image/jpg image/jpeg image/webp]
    ct = avatar.blob&.content_type
    unless allowed.include?(ct)
      errors.add(:avatar, "deve ser PNG, JPG, JPEG ou WEBP")
    end

    size = avatar.blob&.byte_size.to_i
    if size > 5.megabytes
      errors.add(:avatar, "deve ter menos de 5MB")
    end
  end
end