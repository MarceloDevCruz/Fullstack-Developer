class DashboardController < ApplicationController
  layout 'react', only: :index

  before_action :authenticate_user!, only: [:import_spreadsheet, :upload_spreadsheet]
  before_action :require_admin_for_import, only: [:import_spreadsheet, :upload_spreadsheet]

  def index; end

  def import_spreadsheet
    @token = params[:token].presence || SecureRandom.uuid
  end

  def upload_spreadsheet
    token = params[:token].presence || SecureRandom.uuid
    file  = params[:csv_file]

    unless file&.respond_to?(:tempfile)
      redirect_to import_spreadsheet_path(token: token), alert: "Selecione um arquivo válido." and return
    end

    tmp_path = Rails.root.join("tmp", "upload_#{token}_#{Time.now.to_i}_#{file.original_filename}")
    FileUtils.cp(file.tempfile.path, tmp_path)

    ImportSpreadsheetJob.perform_later(
      file_path: tmp_path.to_s,
      channel_token: token,
      user_id: current_user.id
    )

  rescue => e
    redirect_to import_spreadsheet_path, alert: "Falha ao iniciar: #{e.message}"
  end

  private

  def require_admin_for_import
    return if current_user&.admin?
    redirect_back fallback_location: root_path, alert: I18n.t('controllers.user.unauthorized')
  end
end