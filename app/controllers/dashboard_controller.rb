class DashboardController < ApplicationController

  def index
    @user = User.last
  end

end