class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
      t.string :text
      t.string :company
      t.integer :review_count
      t.integer :average_stars

      t.timestamps null: false
    end
  end
end
