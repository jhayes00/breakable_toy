require 'factory_bot'

FactoryBot.define do
  factory :item do
    sequence(:name) { |n| "item#{n}" }
    quantity { 5 }
  end
end
