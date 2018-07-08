FactoryBot.define do
  factory :job do
    title { Faker::Commerce.product_name }
    description  { Faker::Lorem.sentence }
  end
end
