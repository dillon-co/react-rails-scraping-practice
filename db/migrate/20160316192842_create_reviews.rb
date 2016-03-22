class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.date :date_published
      t.integer :rating
      t.string :author
      t.text :description
      t.integer :link_id

      t.timestamps null: false
    end
  end
end
