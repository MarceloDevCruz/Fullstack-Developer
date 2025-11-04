class ImportSpreadsheetChannel < ApplicationCable::Channel
  def subscribed
    token = params[:token].to_s
    stream_from "imports:#{token}" if token.present?
  end
end