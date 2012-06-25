class Location < ActiveRecord::Base
  validates_presence_of :latitude, :longitude
  def as_json(options = {})
    {
      latitude: latitude,
      longitude: longitude,
    }
  end
end
