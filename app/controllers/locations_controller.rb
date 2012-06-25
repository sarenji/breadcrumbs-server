class LocationsController < ApplicationController
  def create
    @location = Location.new
    @location.latitude = params[:location][:latitude]
    @location.longitude = params[:location][:longitude]
    @location.save!
    render :json => @location
  end
end
