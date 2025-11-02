class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  extend FriendlyId

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_one_attached :avatar

  friendly_id :full_name, use: :slugged

  def admin?
    role == 'admin'
  end

  def should_generate_new_friendly_id?
    full_name_changed?
  end
end
