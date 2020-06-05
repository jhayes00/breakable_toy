require 'factory_bot'

FactoryBot.define do
  factory :recipe do
    sequence(:title) { |n| "recipe#{n}" }
    num_missed_ingredients { 5 }
  end
end
