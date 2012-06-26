class LocationsController < ApplicationController
  def index
  end

  def create
    @location = Location.new
    @location.latitude = params[:location][:latitude]
    @location.longitude = params[:location][:longitude]
    @location.unique_id = params[:location][:unique_id]
    @location.save!
    render :json => @location
  end
end
