require 'factory_bot'

FactoryBot.define do
  factory :pantry_item do
    sequence(:name) {|n| "pantry_item#{n}"}
  end
end
