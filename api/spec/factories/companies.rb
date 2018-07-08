FactoryBot.define do
  factory :company do
    name { Faker::Team.name }
  end
end
