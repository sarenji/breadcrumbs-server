class AddUniqueIdToLocation < ActiveRecord::Migration
  def change
    add_column :locations, :unique_id, :text

  end
end
