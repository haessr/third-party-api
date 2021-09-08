# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# byebug

# BASE_URL='https://api.thecatapi.com/v1'

# response = RestClient.get('https://api.thecatapi.com/v1/breeds')
# response = RestClient.get("https://api.thecatapi.com/v1/breeds?t=#{ENV[CAT_API_KEY]}")
# response = RestClient.get('https://api.thecatapi.com/v1/breeds', {
#   x-api-key: ENV["CAT_API_KEY"]
# })
# breeds_array = JSON.parse(response)
# breeds_array.each do |breed| 
#   binding.pry
# end

# response = RestClient.get("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=#{ENV["NYT_KEY"]}")
# books = JSON.parse(response)["results"]["books"]
# books.each do |book|
#   Book.create(title: book["title"], publisher: book["publisher"] , author: book["author"], description: book["description"])
# end
# binding.pry
# Book.destroy_all
Book.get_data