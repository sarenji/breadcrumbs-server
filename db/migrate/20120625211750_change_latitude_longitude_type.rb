class ChangeLatitudeLongitudeType < ActiveRecord::Migration
  def up
    change_column :locations, :longitude, :float
    change_column :locations, :latitude, :float
  end

  def down
    change_column :locations, :longitude, :text
    change_column :locations, :latitude, :text
  end
end
