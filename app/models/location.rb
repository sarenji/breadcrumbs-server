class Location < ActiveRecord::Base
  validates_presence_of :latitude, :longitude

  default_scope order(:created_at)

  def as_json(options = {})
    {
      latitude: latitude,
      longitude: longitude,
      unique_id: unique_id,
    }
  end
end
