# == Schema Information
#
# Table name: reviews
#
#  id             :integer          not null, primary key
#  date_published :date
#  rating         :integer
#  author         :string
#  description    :text
#  link_id        :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#

class Review < ActiveRecord::Base
  belongs_to :link
  
end
