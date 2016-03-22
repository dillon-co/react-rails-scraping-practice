# == Schema Information
#
# Table name: reviews
#
#  id             :integer          not null, primary key
#  date_published :date
#  rating         :integer
#  author         :string
#  description    :text
#  linke_id       :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class CrawlingWorker
  include Sidekiq::Worker
   
  def perform(link_id)
    link = Link.find(link_id)
    data_hash = link.crawl_link
    
    link.update(
      company: data_hash['company'],
      average_stars: data_hash['average_rating'].to_i)

    data_hash["reviews"].each do |review|
      unless link.reviews.where(description: review["description"]).any?
        link.reviews.create(
          rating: review['rating'].to_i,
          author: review['reviewer_name'],
          description: review['description'])
      end  
    end  
  end
   
end
