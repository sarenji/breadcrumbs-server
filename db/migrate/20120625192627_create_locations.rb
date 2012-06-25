class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.text :latitude
      t.text :longitude

      t.timestamps
    end
  end
end
