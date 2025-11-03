FactoryBot.define do
  factory :user do
    full_name { "#{FFaker::NameBR.first_name} #{FFaker::NameBR.last_name} #{FFaker::NameBR.last_name}" }
    sequence(:email) { |n| "mariana#{n}@gmail.com" }
    password { FFaker::Internet.password(10, 20) }
    password_confirmation { password }
    role { :user }

    trait :with_avatar do
      after(:build) do |u|
        u.avatar.attach(
          io: StringIO.new("img"),
          filename: "avatar.jpg",
          content_type: "image/jpeg"
        )
      end
    end
  end
end