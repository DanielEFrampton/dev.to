FactoryBot.define do
  factory :curated_list do
    name { Faker::Superhero.name }
    description { Faker::Movies::Hobbit.quote }
    user
  end
end
