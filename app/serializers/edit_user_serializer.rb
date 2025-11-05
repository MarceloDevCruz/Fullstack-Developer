class EditUserSerializer
  include JSONAPI::Serializer

  attributes :id, :full_name, :email, :slug

  attribute :role do |user|
    UserDecorator.decorate(user).role
  end

  attribute :avatar do |user|
    UserDecorator.decorate(user).avatar_url
  end
end