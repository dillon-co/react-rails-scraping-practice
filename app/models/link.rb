# == Schema Information
#
# Table name: links
#
#  id            :integer          not null, primary key
#  text          :string
#  company       :string
#  review_count  :integer
#  average_stars :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'wombat'

class Link < ActiveRecord::Base
  has_many :reviews

  def crawl_link
    if text.include?('http://')
      _, _2, base, link_path = text.split('/', 4)
    else
      base, link_path = text.split('/', 2)  
    end  
    
    Wombat.crawl do 
      base_url "http://#{base}"
      path "/#{link_path}"

      company "css=.business_card_name"
      average_rating "css=.average/@title"
      address "css=.address" do |e|
        e.split.join(" ")
      end
      telephone "css=.telephone"
      website "css=li.website span a"
      reviews "css=.reviewCtn", :iterator do |review|
        description "css=.description"
        reviewer_name "css=.reviewer" do |reviewer_mess|
          # This returns a bunch of messy crap, and the username isn't nested under an element, so this is a hack to retrieve the username
          reviewer_mess.split[0]
        end
        rating "css=.rating/@title"
        review_date "css=.reviewer .dtreviewed"
      end
    end   
  end

  def crawl_link_and_set_values
    data_hash = self.crawl_link

    self.update(
      company: data_hash['company'],
      average_stars: data_hash['average_rating'].to_i)

    data_hash["reviews"].each do |review|
      unless self.reviews.where(description: review["description"]).any?
        self.reviews.create(
          rating: review['rating'].to_i,
          author: review['reviewer_name'],
          description: review['description']) 
      end  
    end  
  end
    

end
