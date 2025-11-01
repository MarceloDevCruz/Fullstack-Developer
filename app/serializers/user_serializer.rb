class UserSerializer
  include JSONAPI::Serializer

  attributes :id, :full_name, :email

  attribute :role do |user|
    UserDecorator.decorate(user).role
  end
end