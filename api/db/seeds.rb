# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create(email: 'test@test.com', password: 'test')
company = Company.create(name: Faker::Team.name, created_by: User.first.id)

jobOne = company.jobs.create(title: Faker::Commerce.product_name, description: Faker::Lorem.sentence)
jobTwo = company.jobs.create(title: Faker::Commerce.product_name, description: Faker::Lorem.sentence)

jobOne.applicants.create(name: Faker::Name.name, email: Faker::Internet.email, phone: Faker::PhoneNumber.phone_number)
jobOne.applicants.create(name: Faker::Name.name, email: Faker::Internet.email, phone: Faker::PhoneNumber.phone_number)
jobTwo.applicants.create(name: Faker::Name.name, email: Faker::Internet.email, phone: Faker::PhoneNumber.phone_number)
jobTwo.applicants.create(name: Faker::Name.name, email: Faker::Internet.email, phone: Faker::PhoneNumber.phone_number)
