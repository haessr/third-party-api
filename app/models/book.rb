class Book < ApplicationRecord

  def self.get_data
    response = RestClient.get("https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=#{ENV["NYT_KEY"]}")
    books = JSON.parse(response)["results"]["books"]
    books.each do |book|
      self.create(title: book["title"],
        publisher: book["publisher"] ,
        author: book["author"],
        description: book["description"])
    end
  end
end
